const hre = require("hardhat");

async function main() {
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
  
  if (!CONTRACT_ADDRESS) {
    console.error("❌ CONTRACT_ADDRESS not set in .env file");
    process.exit(1);
  }

  const NAME = "OpenMint NFT";
  const SYMBOL = "OMNFT";
  const MINT_PRICE = hre.ethers.parseEther("0.01");
  const MAX_SUPPLY = 10000;

  console.log("Verifying contract on Etherscan...");
  console.log(`Contract Address: ${CONTRACT_ADDRESS}`);

  try {
    await hre.run("verify:verify", {
      address: CONTRACT_ADDRESS,
      constructorArguments: [NAME, SYMBOL, MINT_PRICE, MAX_SUPPLY],
    });

    console.log("✅ Contract verified successfully!");
  } catch (error) {
    console.error("❌ Verification failed:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
