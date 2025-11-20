# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in OpenMint, please help us protect our users by reporting it responsibly.

### How to Report

**DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, please email security concerns to: **[Your Email]** or use GitHub's private vulnerability reporting feature:

1. Go to the repository's Security tab
2. Click "Report a vulnerability"
3. Fill in the details

### What to Include

Please provide:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fix (if you have one)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity (Critical: <7 days, High: <30 days)

## Security Best Practices

### For Users

1. **Never commit private keys** to any repository
2. **Use .env files** for all sensitive data
3. **Verify .gitignore** includes `.env` files
4. **Test on testnets** before mainnet deployment
5. **Audit contracts** before deploying with real funds
6. **Use hardware wallets** for high-value operations
7. **Keep dependencies updated** regularly

### For Contributors

1. **Never hardcode** API keys, private keys, or secrets
2. **Use environment variables** for all configuration
3. **Review code** for potential security issues
4. **Test thoroughly** on local/testnet before mainnet
5. **Follow Web3 security best practices**:
   - Check for reentrancy vulnerabilities
   - Validate all inputs
   - Use SafeMath or Solidity 0.8+
   - Follow checks-effects-interactions pattern

## Known Security Considerations

### Smart Contracts

- Uses OpenZeppelin audited contracts
- Solidity 0.8.20+ (built-in overflow protection)
- Access control via `Ownable`
- Pausable minting functionality

### Frontend

- No private keys stored in browser
- MetaMask for transaction signing
- Environment variables for API keys
- HTTPS recommended for production

### IPFS/Pinata

- API keys required (stored in .env)
- Content is public on IPFS
- Metadata follows ERC-721 standard

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Updates

Security patches will be released as soon as possible after verification. Users will be notified via:
- GitHub Security Advisories
- README updates
- Release notes

## Bug Bounty

Currently, we do not have a formal bug bounty program. However, we deeply appreciate security researchers who responsibly disclose vulnerabilities and will acknowledge contributors in our security hall of fame.

## Acknowledgments

We thank the following security researchers for their responsible disclosure:
- [Coming soon]

---

**Last Updated:** 2025-11-19
