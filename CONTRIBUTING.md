# Contributing to OpenMint

Thank you for considering contributing to OpenMint! This document provides guidelines for contributing to this project.

## 🌟 How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, Node version, browser)

### Suggesting Features

Feature suggestions are welcome! Please:
- Check if the feature has already been requested
- Provide a clear use case
- Explain why this feature would be useful
- Consider implementation complexity

### Pull Requests

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/nft-minting-dapp.git
   cd nft-minting-dapp
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install Dependencies**
   ```bash
   npm install
   cd frontend && npm install
   ```

4. **Make Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

5. **Test Your Changes**
   ```bash
   # Test smart contracts
   npx hardhat test
   
   # Test frontend locally
   npm run frontend:dev
   ```

6. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```
   
   Use conventional commits:
   - `feat:` - New features
   - `fix:` - Bug fixes
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting)
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

7. **Push & Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a Pull Request on GitHub.

## 📝 Code Standards

### Smart Contracts (Solidity)
- Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Add NatSpec comments for all public functions
- Write tests for all contract functionality
- Use OpenZeppelin contracts when possible

### Frontend (JavaScript/React)
- Use ES6+ syntax
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Add PropTypes or TypeScript types

### Git Workflow
- Keep commits atomic and focused
- Write clear commit messages
- Rebase before creating PR
- Squash commits if needed

## 🧪 Testing

All contributions should include tests:

```bash
# Run all tests
npx hardhat test

# Run with coverage
npx hardhat coverage
```

Aim for >80% code coverage on smart contracts.

## 📋 Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No console.log or debug code
- [ ] Environment variables properly used
- [ ] No hardcoded secrets or keys

## 🔒 Security

- **Never commit private keys** or sensitive data
- Use `.env` files (already in `.gitignore`)
- Report security vulnerabilities privately
- Follow Web3 security best practices

## 💬 Questions?

Feel free to:
- Open a discussion on GitHub
- Ask in pull request comments
- Open an issue for clarification

Thank you for contributing! 🙏
