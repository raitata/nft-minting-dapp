"use client";

import { useState, useEffect } from "react";
import { mintNFT, getMintPrice, getTotalSupply, getMaxSupply, isMintingPaused } from "../utils/web3";
import { uploadNFTData } from "../utils/ipfs";
import { toast } from "react-toastify";
import { FaImage, FaSpinner } from "react-icons/fa";
import UploadIPFS from "./UploadIPFS";

export default function NFTMinter({ account }) {
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintPrice, setMintPrice] = useState("0");
  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    loadContractData();
  }, []);

  const loadContractData = async () => {
    try {
      const [price, total, max, paused] = await Promise.all([
        getMintPrice(),
        getTotalSupply(),
        getMaxSupply(),
        isMintingPaused(),
      ]);

      setMintPrice(price);
      setTotalSupply(total);
      setMaxSupply(max);
      setIsPaused(paused);
    } catch (error) {
      console.error("Error loading contract data:", error);
    }
  };

  const handleImageSelect = (file) => {
    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleMint = async () => {
    // Validation
    if (!account) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }

    if (!nftName.trim()) {
      toast.error("Please enter NFT name");
      return;
    }

    if (!nftDescription.trim()) {
      toast.error("Please enter NFT description");
      return;
    }

    if (isPaused) {
      toast.error("Minting is currently paused");
      return;
    }

    if (maxSupply > 0 && totalSupply >= maxSupply) {
      toast.error("Maximum supply reached");
      return;
    }

    setIsMinting(true);

    try {
      // Step 1: Upload to IPFS
      toast.info("Uploading to IPFS...");
      const metadataURI = await uploadNFTData(
        imageFile,
        nftName,
        nftDescription,
        []
      );

      // Step 2: Mint NFT
      toast.info("Minting NFT...");
      const receipt = await mintNFT(metadataURI, account);

      // Success
      toast.success(`NFT minted successfully! Token ID: ${receipt.events.NFTMinted.returnValues.tokenId}`);

      // Reset form
      setNftName("");
      setNftDescription("");
      setImageFile(null);
      setImagePreview(null);

      // Reload contract data
      loadContractData();
    } catch (error) {
      console.error("Error minting NFT:", error);
      toast.error(`Failed to mint NFT: ${error.message}`);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="nft-minter">
      <div className="minter-header">
        <h2>Mint Your NFT</h2>
        <div className="supply-info">
          <span>{totalSupply}</span>
          {maxSupply > 0 && <span> / {maxSupply}</span>}
          <span className="supply-label"> Minted</span>
        </div>
      </div>

      <div className="mint-price">
        <span>Mint Price: {mintPrice} ETH</span>
      </div>

      {isPaused && (
        <div className="alert alert-warning">
          ⚠️ Minting is currently paused
        </div>
      )}

      <div className="minter-form">
        {/* Image Upload */}
        <div className="form-group">
          <label>Image *</label>
          <UploadIPFS onFileSelect={handleImageSelect} />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="NFT Preview" />
            </div>
          )}
        </div>

        {/* NFT Name */}
        <div className="form-group">
          <label htmlFor="nftName">Name *</label>
          <input
            type="text"
            id="nftName"
            value={nftName}
            onChange={(e) => setNftName(e.target.value)}
            placeholder="Enter NFT name"
            disabled={isMinting}
          />
        </div>

        {/* NFT Description */}
        <div className="form-group">
          <label htmlFor="nftDescription">Description *</label>
          <textarea
            id="nftDescription"
            value={nftDescription}
            onChange={(e) => setNftDescription(e.target.value)}
            placeholder="Enter NFT description"
            rows="4"
            disabled={isMinting}
          />
        </div>

        {/* Mint Button */}
        <button
          onClick={handleMint}
          disabled={isMinting || !account || isPaused}
          className="mint-button"
        >
          {isMinting ? (
            <>
              <FaSpinner className="spinner" /> Minting...
            </>
          ) : (
            "Mint NFT"
          )}
        </button>
      </div>
    </div>
  );
}
