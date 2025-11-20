# OpenMint - NFT Minting DApp 🎨

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-orange)
![Next.js](https://img.shields.io/badge/Next.js-14-black)

Open-source decentralized application (DApp) for minting unique ERC-721 NFTs on Ethereum. Built with Hardhat, Next.js, Web3.js, and IPFS.

## ✨ Features

- 🎨 **ERC-721 NFT Minting** - Create unique non-fungible tokens
- 🔗 **MetaMask Integration** - Web3 wallet connection
- 📦 **IPFS Storage** - Decentralized hosting for images and metadata
- 🔒 **Secure Smart Contracts** - Built with OpenZeppelin
- ⚡ **Modern Interface** - Responsive UI/UX with Next.js 14
- 🧪 **Comprehensive Tests** - Hardhat test suite with Chai/Mocha
- 📊 **Supply Management** - Max supply and minting pause support

## 🛠️ Tech Stack

### Blockchain & Smart Contracts
- Solidity ^0.8.20
- Hardhat (compilation, testing, deployment)
- OpenZeppelin Contracts (ERC-721, Ownable)
- Ethereum (Localhost/Sepolia/Mainnet)

### Frontend
- Next.js 14 (React framework)
- Web3.js 4.x (blockchain interaction)
- TailwindCSS (styling)
- React Toastify (notifications)

### Decentralized Storage
- IPFS (via Pinata API)
- ERC-721 metadata standard support

## 📋 Prerequisites

- Node.js v18+ and npm
- MetaMask browser extension
- Pinata account (for IPFS): [pinata.cloud](https://pinata.cloud)
- ETH for gas fees (Sepolia testnet faucet: [sepoliafaucet.com](https://sepoliafaucet.com))
- Etherscan API key (optional, for verification)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/nft-minting-dapp.git
cd nft-minting-dapp
```

### 2. Install Dependencies

```bash
# Install root dependencies (Hardhat, contracts)
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Blockchain Configuration
SEPOLIA_RPC_URL=https://rpc.ankr.com/eth_sepolia
MAINNET_RPC_URL=https://rpc.ankr.com/eth

# Wallet Private Key (NEVER commit this!)
PRIVATE_KEY=your_private_key_here

# Etherscan API Key (for contract verification)
ETHERSCAN_API_KEY=your_etherscan_api_key

# IPFS/Pinata Configuration
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key
```

Create `frontend/.env.local`:

```bash
# Contract Address (fill after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=

# IPFS/Pinata Configuration
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key
```

### 4. Compile Smart Contracts

```bash
npx hardhat compile
```

### 5. Run Tests

```bash
npx hardhat test
```

## 🏃 Running the Application

### Option A: Local Development (Hardhat Network)

1. **Start local blockchain node**:
```bash
npx hardhat node
```

2. **Deploy the contract** (in a new terminal):
```bash
npx hardhat run scripts/deploy.js --network localhost
```

3. **Copy the deployed contract address** and update `frontend/.env.local`:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

4. **Configure MetaMask**:
   - Add network: Localhost 8545
   - Chain ID: 31337
   - RPC URL: http://127.0.0.1:8545
   - Import a test account using one of the Hardhat private keys

5. **Start the frontend**:
```bash
npm run frontend:dev
```

6. **Open** http://localhost:3000

### Option B: Sepolia Testnet

1. **Get Sepolia ETH** from a faucet
2. **Deploy to Sepolia**:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

3. **Update** `frontend/.env.local` with the deployed address
4. **Configure MetaMask** to Sepolia network
5. **Start the frontend** and connect

## 📝 Usage

1. **Connect Wallet** - Click "Connect Wallet" and approve in MetaMask
2. **Upload Image** - Drag & drop or select an NFT image
3. **Fill Metadata** - Enter NFT name and description
4. **Mint** - Click "Mint NFT" and confirm the transaction
5. **Done!** - Your NFT is minted and stored on IPFS

## 🧪 Testing

```bash
# Run all tests
npx hardhat test

# Run tests with coverage
npx hardhat coverage

# Run specific test file
npx hardhat test test/NFTMinter.test.js
```

## 📦 Deployment

### Deploy to Sepolia Testnet

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Deploy to Mainnet

```bash
npx hardhat run scripts/deploy.js --network mainnet
```

### Verify Contract on Etherscan

```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS "OpenMint NFT" "OMNFT" "10000000000000000" 10000
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenZeppelin](https://openzeppelin.com/) - Smart contract libraries
- [Hardhat](https://hardhat.org/) - Ethereum development environment
- [Pinata](https://pinata.cloud/) - IPFS pinning service
- [Next.js](https://nextjs.org/) - React framework

## ⚠️ Security

- **Never commit private keys** to the repository
- Use `.env` files for sensitive data (already in `.gitignore`)
- Audit smart contracts before mainnet deployment
- Test thoroughly on testnets first

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ for the Web3 community
