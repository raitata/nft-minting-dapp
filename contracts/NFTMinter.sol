// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NFTMinter
 * @dev ERC-721 NFT contract for minting unique tokens with IPFS metadata
 * @notice This contract allows users to mint NFTs by providing metadata URI
 * @custom:security-contact security@openmint.io
 */
contract NFTMinter is ERC721, ERC721URIStorage, Ownable {
    
    // Token ID counter for tracking minted NFTs
    uint256 private _tokenIdCounter;
    
    // Base URI for token metadata
    string private _baseTokenURI;
    
    // Minting price in wei
    uint256 public mintPrice;
    
    // Maximum supply of NFTs (0 = unlimited)
    uint256 public maxSupply;
    
    // Toggle for pausing minting
    bool public mintingPaused;
    
    // Events
    event NFTMinted(address indexed minter, uint256 indexed tokenId, string tokenURI);
    event BaseURIUpdated(string newBaseURI);
    event MintPriceUpdated(uint256 newPrice);
    event MintingPausedToggled(bool isPaused);
    event FundsWithdrawn(address indexed owner, uint256 amount);
    
    /**
     * @dev Constructor to initialize the NFT collection
     * @param name Token collection name
     * @param symbol Token collection symbol
     * @param _mintPrice Initial minting price in wei
     * @param _maxSupply Maximum supply (0 for unlimited)
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 _mintPrice,
        uint256 _maxSupply
    ) ERC721(name, symbol) Ownable(msg.sender) {
        mintPrice = _mintPrice;
        maxSupply = _maxSupply;
        mintingPaused = false;
    }
    
    /**
     * @dev Modifier to check if minting is currently allowed
     */
    modifier whenMintingActive() {
        require(!mintingPaused, "Minting is currently paused");
        _;
    }
    
    /**
     * @dev Public function to mint a new NFT
     * @param tokenURI Metadata URI (IPFS hash) for the NFT
     * @notice User must send exact mint price in ETH
     */
    function mint(string memory tokenURI) public payable whenMintingActive {
        require(msg.value >= mintPrice, "Insufficient payment for minting");
        
        // Check max supply if set
        if (maxSupply > 0) {
            require(_tokenIdCounter < maxSupply, "Max supply reached");
        }
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        emit NFTMinted(msg.sender, tokenId, tokenURI);
    }
    
    /**
     * @dev Batch mint multiple NFTs (owner only)
     * @param to Address to receive the NFTs
     * @param tokenURIs Array of metadata URIs
     */
    function batchMint(address to, string[] memory tokenURIs) public onlyOwner {
        for (uint256 i = 0; i < tokenURIs.length; i++) {
            uint256 tokenId = _tokenIdCounter;
            _tokenIdCounter++;
            
            _safeMint(to, tokenId);
            _setTokenURI(tokenId, tokenURIs[i]);
            
            emit NFTMinted(to, tokenId, tokenURIs[i]);
        }
    }
    
    /**
     * @dev Set base URI for all tokens
     * @param baseURI New base URI string
     */
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
        emit BaseURIUpdated(baseURI);
    }
    
    /**
     * @dev Update minting price
     * @param newPrice New price in wei
     */
    function setMintPrice(uint256 newPrice) public onlyOwner {
        mintPrice = newPrice;
        emit MintPriceUpdated(newPrice);
    }
    
    /**
     * @dev Toggle minting pause state
     */
    function toggleMinting() public onlyOwner {
        mintingPaused = !mintingPaused;
        emit MintingPausedToggled(mintingPaused);
    }
    
    /**
     * @dev Withdraw contract balance to owner
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
        
        emit FundsWithdrawn(owner(), balance);
    }
    
    /**
     * @dev Get total number of minted NFTs
     * @return Current token count
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
    
    /**
     * @dev Override base URI function
     */
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    /**
     * @dev Required override for ERC721URIStorage
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    /**
     * @dev Required override for ERC721URIStorage
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
