"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import NFTMinter from "../components/NFTMinter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [account, setAccount] = useState(null);

  const handleWalletConnect = (connectedAccount) => {
    setAccount(connectedAccount);
  };

  return (
    <div className="app">
      <Navbar account={account} onConnect={handleWalletConnect} />

      <main className="main-content">
        <div className="container">
          <div className="hero-section">
            <h1 className="hero-title">Create Your Unique NFTs</h1>
            <p className="hero-description">
              Mint your digital art on the Ethereum blockchain with ease.
              Connect your wallet, upload your artwork, and create NFTs in minutes.
            </p>
          </div>

          <div className="minter-section">
            <NFTMinter account={account} />
          </div>

          <div className="info-section">
            <div className="info-card">
              <h3>🎨 Unique NFTs</h3>
              <p>Each token is a one-of-a-kind ERC-721 NFT stored on Ethereum</p>
            </div>
            <div className="info-card">
              <h3>📦 IPFS Storage</h3>
              <p>Your artwork and metadata are permanently stored on IPFS</p>
            </div>
            <div className="info-card">
              <h3>🔒 Fully Decentralized</h3>
              <p>Smart contracts ensure transparent and secure minting</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Built with ❤️ for the Web3 community | Open Source | MIT License</p>
      </footer>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
