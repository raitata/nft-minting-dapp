#!/bin/bash
# Publishing to GitHub - Step by Step Commands

echo "=================================================="
echo "NFT Minting DApp - GitHub Publishing Script"
echo "=================================================="
echo ""

# Step 1: Configure Git (if not already done)
echo "Step 1: Configuring Git..."
echo "Please enter your GitHub username:"
read github_username
git config --global user.name "$github_username"

echo "Please enter your GitHub email:"
read github_email
git config --global user.email "$github_email"

# Step 2: Add all files
echo ""
echo "Step 2: Adding files to git..."
git add .

# Step 3: Create initial commit
echo ""
echo "Step 3: Creating initial commit..."
git commit -m "Initial commit: OpenMint NFT Minting DApp

- Secure ERC-721 NFT minting
- IPFS integration via Pinata
- Next.js 14 frontend
- Hardhat smart contracts
- Comprehensive documentation"

# Step 4: Add remote (you'll need to create the repo on GitHub first)
echo ""
echo "=================================================="
echo "IMPORTANT: Create GitHub Repository"
echo "=================================================="
echo ""
echo "Go to: https://github.com/new"
echo ""
echo "Repository settings:"
echo "  Name: nft-minting-dapp"
echo "  Description: Open-source NFT minting DApp with ERC-721, IPFS, and Next.js"
echo "  Visibility: Public ✅"
echo "  ❌ DO NOT initialize with README, .gitignore, or license"
echo ""
echo "After creating the repository, press Enter to continue..."
read

echo ""
echo "Please enter your GitHub username again:"
read github_username

echo ""
echo "Step 4: Adding remote repository..."
git remote add origin "https://github.com/$github_username/nft-minting-dapp.git"

# Step 5: Push to GitHub
echo ""
echo "Step 5: Pushing to GitHub..."
echo "You may be prompted for your GitHub credentials..."
git branch -M main
git push -u origin main

echo ""
echo "=================================================="
echo "✅ SUCCESS! Your project is now on GitHub!"
echo "=================================================="
echo ""
echo "View it at: https://github.com/$github_username/nft-minting-dapp"
echo ""
echo "Next steps:"
echo "1. Add repository description on GitHub"
echo "2. Add topics: nft, ethereum, web3, dapp, erc721, ipfs, nextjs"
echo "3. Enable GitHub Issues"
echo "4. Enable Discussions (optional)"
echo ""
