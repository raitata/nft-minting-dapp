"use client";

import { FaGithub } from "react-icons/fa";
import WalletConnect from "./WalletConnect";

export default function Navbar({ account, onConnect }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>OpenMint</h1>
          <span className="badge">NFT Minting DApp</span>
        </div>

        <div className="navbar-actions">
          <a
            href="https://github.com/yourusername/nft-minting-dapp"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <FaGithub />
          </a>
          <WalletConnect onConnect={onConnect} />
        </div>
      </div>
    </nav>
  );
}
