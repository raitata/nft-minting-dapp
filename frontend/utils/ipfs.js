import axios from "axios";
import { PINATA_API_KEY, PINATA_SECRET_KEY } from "./constants";

/**
 * Upload image to IPFS via Pinata
 * @param {File} file - Image file to upload
 * @returns {string} IPFS hash
 */
export const uploadImageToIPFS = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const pinataMetadata = JSON.stringify({
      name: file.name,
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 1,
    });
    formData.append("pinataOptions", pinataOptions);

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      }
    );

    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading image to IPFS:", error);
    throw error;
  }
};

/**
 * Upload JSON metadata to IPFS via Pinata
 * @param {Object} metadata - NFT metadata object
 * @returns {string} IPFS hash
 */
export const uploadMetadataToIPFS = async (metadata) => {
  try {
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      metadata,
      {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      }
    );

    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading metadata to IPFS:", error);
    throw error;
  }
};

/**
 * Create NFT metadata object
 * @param {string} name - NFT name
 * @param {string} description - NFT description
 * @param {string} imageHash - IPFS hash of the image
 * @param {Object} attributes - Additional attributes
 * @returns {Object} Metadata object
 */
export const createMetadata = (name, description, imageHash, attributes = []) => {
  return {
    name: name,
    description: description,
    image: `ipfs://${imageHash}`,
    attributes: attributes,
    external_url: "",
  };
};

/**
 * Complete NFT upload process (image + metadata)
 * @param {File} imageFile - Image file
 * @param {string} name - NFT name
 * @param {string} description - NFT description
 * @param {Array} attributes - NFT attributes
 * @returns {string} Metadata IPFS URI
 */
export const uploadNFTData = async (imageFile, name, description, attributes = []) => {
  try {
    // Step 1: Upload image
    const imageHash = await uploadImageToIPFS(imageFile);
    console.log("Image uploaded to IPFS:", imageHash);

    // Step 2: Create metadata
    const metadata = createMetadata(name, description, imageHash, attributes);

    // Step 3: Upload metadata
    const metadataHash = await uploadMetadataToIPFS(metadata);
    console.log("Metadata uploaded to IPFS:", metadataHash);

    return `ipfs://${metadataHash}`;
  } catch (error) {
    console.error("Error uploading NFT data:", error);
    throw error;
  }
};
