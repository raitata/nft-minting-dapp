"use client";

import { useState, useEffect } from "react";
import { connectWallet, getWeb3 } from "../utils/web3";
import { FaWallet } from "react-icons/fa";

export default function WalletConnect({ onConnect }) {
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    checkConnection();
    
    // Listen for account changes
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  const checkConnection = async () => {
    try {
      const web3 = getWeb3();
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          onConnect && onConnect(accounts[0]);
        }
      }
    } catch (error) {
      console.error("Error checking connection:", error);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setAccount(null);
      onConnect && onConnect(null);
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
      onConnect && onConnect(accounts[0]);
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const { account: connectedAccount } = await connectWallet();
      setAccount(connectedAccount);
      onConnect && onConnect(connectedAccount);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const formatAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="wallet-connect">
      {account ? (
        <div className="connected-wallet">
          <div className="wallet-icon">
            <FaWallet />
          </div>
          <span className="wallet-address">{formatAddress(account)}</span>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="connect-button"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
}
