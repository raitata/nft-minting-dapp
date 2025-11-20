import Web3 from "web3";
import { CONTRACT_ADDRESS, CONTRACT_ABI, NETWORK_CONFIG } from "./constants";

let web3;
let contract;

/**
 * Initialize Web3 instance
 * @returns {Web3} Web3 instance
 */
export const initWeb3 = () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    return web3;
  } else {
    console.error("MetaMask not detected");
    return null;
  }
};

/**
 * Get Web3 instance
 * @returns {Web3} Web3 instance
 */
export const getWeb3 = () => {
  if (!web3) {
    web3 = initWeb3();
  }
  return web3;
};

/**
 * Connect MetaMask wallet
 * @returns {Object} { account, chainId }
 */
export const connectWallet = async () => {
  try {
    const web3Instance = getWeb3();
    if (!web3Instance) {
      throw new Error("Web3 not initialized");
    }

    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // Check network
    const chainId = await window.ethereum.request({ method: "eth_chainId" });

    // Switch to correct network if needed
    if (chainId !== NETWORK_CONFIG.chainId) {
      await switchNetwork();
    }

    return {
      account: accounts[0],
      chainId: chainId,
    };
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
};

/**
 * Switch to the correct network
 */
export const switchNetwork = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: NETWORK_CONFIG.chainId }],
    });
  } catch (switchError) {
    // Network not added, add it
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [NETWORK_CONFIG],
      });
    } else {
      throw switchError;
    }
  }
};

/**
 * Get contract instance
 * @returns {Contract} Contract instance
 */
export const getContract = () => {
  const web3Instance = getWeb3();
  if (!contract && web3Instance) {
    contract = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  }
  return contract;
};

/**
 * Get current account
 * @returns {string} Current account address
 */
export const getCurrentAccount = async () => {
  const web3Instance = getWeb3();
  if (!web3Instance) return null;

  const accounts = await web3Instance.eth.getAccounts();
  return accounts[0] || null;
};

/**
 * Get mint price from contract
 * @returns {string} Mint price in ETH
 */
export const getMintPrice = async () => {
  try {
    const contractInstance = getContract();
    const price = await contractInstance.methods.mintPrice().call();
    return web3.utils.fromWei(price, "ether");
  } catch (error) {
    console.error("Error getting mint price:", error);
    return "0";
  }
};

/**
 * Get total supply
 * @returns {number} Total minted NFTs
 */
export const getTotalSupply = async () => {
  try {
    const contractInstance = getContract();
    const supply = await contractInstance.methods.totalSupply().call();
    return Number(supply);
  } catch (error) {
    console.error("Error getting total supply:", error);
    return 0;
  }
};

/**
 * Get max supply
 * @returns {number} Max supply
 */
export const getMaxSupply = async () => {
  try {
    const contractInstance = getContract();
    const maxSupply = await contractInstance.methods.maxSupply().call();
    return Number(maxSupply);
  } catch (error) {
    console.error("Error getting max supply:", error);
    return 0;
  }
};

/**
 * Check if minting is paused
 * @returns {boolean} Is minting paused
 */
export const isMintingPaused = async () => {
  try {
    const contractInstance = getContract();
    return await contractInstance.methods.mintingPaused().call();
  } catch (error) {
    console.error("Error checking minting status:", error);
    return true;
  }
};

/**
 * Mint NFT
 * @param {string} tokenURI - IPFS metadata URI
 * @param {string} account - User account address
 * @returns {Object} Transaction receipt
 */
export const mintNFT = async (tokenURI, account) => {
  try {
    const contractInstance = getContract();
    const mintPrice = await contractInstance.methods.mintPrice().call();

    const tx = await contractInstance.methods.mint(tokenURI).send({
      from: account,
      value: mintPrice,
      gas: 500000,
    });

    return tx;
  } catch (error) {
    console.error("Error minting NFT:", error);
    throw error;
  }
};

/**
 * Get account balance in ETH
 * @param {string} account - Account address
 * @returns {string} Balance in ETH
 */
export const getBalance = async (account) => {
  try {
    const web3Instance = getWeb3();
    const balance = await web3Instance.eth.getBalance(account);
    return web3Instance.utils.fromWei(balance, "ether");
  } catch (error) {
    console.error("Error getting balance:", error);
    return "0";
  }
};
