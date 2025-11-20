const hre = require("hardhat");

async function main() {
  console.log("Starting NFTMinter deployment...");

  // Get the contract factory
  const NFTMinter = await hre.ethers.getContractFactory("NFTMinter");

  // Deployment parameters
  const NAME = "OpenMint NFT";
  const SYMBOL = "OMNFT";
  const MINT_PRICE = hre.ethers.parseEther("0.01"); // 0.01 ETH
  const MAX_SUPPLY = 10000; // 10,000 NFTs max (0 for unlimited)

  console.log("\nDeployment Configuration:");
  console.log("========================");
  console.log(`Name: ${NAME}`);
  console.log(`Symbol: ${SYMBOL}`);
  console.log(`Mint Price: ${hre.ethers.formatEther(MINT_PRICE)} ETH`);
  console.log(`Max Supply: ${MAX_SUPPLY === 0 ? "Unlimited" : MAX_SUPPLY}`);

  // Deploy the contract
  const nftMinter = await NFTMinter.deploy(NAME, SYMBOL, MINT_PRICE, MAX_SUPPLY);

  await nftMinter.waitForDeployment();

  const contractAddress = await nftMinter.getAddress();

  console.log("\n✅ NFTMinter deployed successfully!");
  console.log("==================================");
  console.log(`Contract Address: ${contractAddress}`);
  console.log(`Network: ${hre.network.name}`);
  console.log(`Deployer: ${(await hre.ethers.getSigners())[0].address}`);

  // Wait for block confirmations before verification
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\nWaiting for block confirmations...");
    await nftMinter.deploymentTransaction().wait(5);

    console.log("\n🔍 Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [NAME, SYMBOL, MINT_PRICE, MAX_SUPPLY],
      });
      console.log("✅ Contract verified successfully!");
    } catch (error) {
      console.log("❌ Verification failed:", error.message);
    }
  }

  console.log("\n📝 Save this information:");
  console.log("=========================");
  console.log(`CONTRACT_ADDRESS=${contractAddress}`);
  console.log(`NETWORK=${hre.network.name}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
