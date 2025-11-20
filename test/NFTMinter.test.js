const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMinter Contract", function () {
  let nftMinter;
  let owner;
  let user1;
  let user2;
  const MINT_PRICE = ethers.parseEther("0.01");
  const MAX_SUPPLY = 100;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const NFTMinter = await ethers.getContractFactory("NFTMinter");
    nftMinter = await NFTMinter.deploy(
      "Test NFT",
      "TNFT",
      MINT_PRICE,
      MAX_SUPPLY
    );
    await nftMinter.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await nftMinter.name()).to.equal("Test NFT");
      expect(await nftMinter.symbol()).to.equal("TNFT");
    });

    it("Should set the correct owner", async function () {
      expect(await nftMinter.owner()).to.equal(owner.address);
    });

    it("Should set the correct mint price", async function () {
      expect(await nftMinter.mintPrice()).to.equal(MINT_PRICE);
    });

    it("Should set the correct max supply", async function () {
      expect(await nftMinter.maxSupply()).to.equal(MAX_SUPPLY);
    });

    it("Should not be paused initially", async function () {
      expect(await nftMinter.mintingPaused()).to.equal(false);
    });
  });

  describe("Minting", function () {
    const TOKEN_URI = "ipfs://QmTest123456789";

    it("Should mint NFT with correct payment", async function () {
      await expect(
        nftMinter.connect(user1).mint(TOKEN_URI, { value: MINT_PRICE })
      )
        .to.emit(nftMinter, "NFTMinted")
        .withArgs(user1.address, 0, TOKEN_URI);

      expect(await nftMinter.ownerOf(0)).to.equal(user1.address);
      expect(await nftMinter.tokenURI(0)).to.equal(TOKEN_URI);
      expect(await nftMinter.totalSupply()).to.equal(1);
    });

    it("Should fail with insufficient payment", async function () {
      await expect(
        nftMinter.connect(user1).mint(TOKEN_URI, { value: ethers.parseEther("0.005") })
      ).to.be.revertedWith("Insufficient payment for minting");
    });

    it("Should fail when minting is paused", async function () {
      await nftMinter.toggleMinting();
      await expect(
        nftMinter.connect(user1).mint(TOKEN_URI, { value: MINT_PRICE })
      ).to.be.revertedWith("Minting is currently paused");
    });

    it("Should mint multiple NFTs", async function () {
      await nftMinter.connect(user1).mint(TOKEN_URI, { value: MINT_PRICE });
      await nftMinter.connect(user2).mint(TOKEN_URI, { value: MINT_PRICE });

      expect(await nftMinter.totalSupply()).to.equal(2);
      expect(await nftMinter.ownerOf(0)).to.equal(user1.address);
      expect(await nftMinter.ownerOf(1)).to.equal(user2.address);
    });

    it("Should fail when max supply is reached", async function () {
      // Deploy contract with max supply of 2
      const NFTMinter = await ethers.getContractFactory("NFTMinter");
      const limitedNFT = await NFTMinter.deploy("Limited", "LTD", MINT_PRICE, 2);
      await limitedNFT.waitForDeployment();

      await limitedNFT.connect(user1).mint(TOKEN_URI, { value: MINT_PRICE });
      await limitedNFT.connect(user2).mint(TOKEN_URI, { value: MINT_PRICE });

      await expect(
        limitedNFT.connect(user1).mint(TOKEN_URI, { value: MINT_PRICE })
      ).to.be.revertedWith("Max supply reached");
    });
  });

  describe("Batch Minting", function () {
    it("Should batch mint multiple NFTs (owner only)", async function () {
      const tokenURIs = [
        "ipfs://QmTest1",
        "ipfs://QmTest2",
        "ipfs://QmTest3",
      ];

      await nftMinter.batchMint(user1.address, tokenURIs);

      expect(await nftMinter.totalSupply()).to.equal(3);
      expect(await nftMinter.ownerOf(0)).to.equal(user1.address);
      expect(await nftMinter.tokenURI(0)).to.equal(tokenURIs[0]);
    });

    it("Should fail batch mint for non-owner", async function () {
      const tokenURIs = ["ipfs://QmTest1"];
      await expect(
        nftMinter.connect(user1).batchMint(user1.address, tokenURIs)
      ).to.be.revertedWithCustomError(nftMinter, "OwnableUnauthorizedAccount");
    });
  });

  describe("Admin Functions", function () {
    it("Should update base URI (owner only)", async function () {
      const newBaseURI = "ipfs://newbase/";
      await expect(nftMinter.setBaseURI(newBaseURI))
        .to.emit(nftMinter, "BaseURIUpdated")
        .withArgs(newBaseURI);
    });

    it("Should update mint price (owner only)", async function () {
      const newPrice = ethers.parseEther("0.02");
      await expect(nftMinter.setMintPrice(newPrice))
        .to.emit(nftMinter, "MintPriceUpdated")
        .withArgs(newPrice);

      expect(await nftMinter.mintPrice()).to.equal(newPrice);
    });

    it("Should toggle minting pause", async function () {
      await expect(nftMinter.toggleMinting())
        .to.emit(nftMinter, "MintingPausedToggled")
        .withArgs(true);

      expect(await nftMinter.mintingPaused()).to.equal(true);

      await nftMinter.toggleMinting();
      expect(await nftMinter.mintingPaused()).to.equal(false);
    });

    it("Should fail admin functions for non-owner", async function () {
      await expect(
        nftMinter.connect(user1).setMintPrice(ethers.parseEther("0.02"))
      ).to.be.revertedWithCustomError(nftMinter, "OwnableUnauthorizedAccount");
    });
  });

  describe("Withdrawal", function () {
    it("Should withdraw funds to owner", async function () {
      const TOKEN_URI = "ipfs://QmTest";
      await nftMinter.connect(user1).mint(TOKEN_URI, { value: MINT_PRICE });

      const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
      const tx = await nftMinter.withdraw();
      const receipt = await tx.wait();
      const gasCost = receipt.gasUsed * receipt.gasPrice;

      const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);

      expect(ownerBalanceAfter).to.equal(
        ownerBalanceBefore + MINT_PRICE - gasCost
      );
    });

    it("Should fail withdrawal with no funds", async function () {
      await expect(nftMinter.withdraw()).to.be.revertedWith("No funds to withdraw");
    });

    it("Should fail withdrawal for non-owner", async function () {
      await expect(
        nftMinter.connect(user1).withdraw()
      ).to.be.revertedWithCustomError(nftMinter, "OwnableUnauthorizedAccount");
    });
  });
});
