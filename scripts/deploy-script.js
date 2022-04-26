const hre = require("hardhat");
const fs = require("fs");

async function main() {
  // We get the contract to deploy
  const Waver = await hre.ethers.getContractFactory("Waver");
  const waver = await Waver.deploy();

  await waver.deployed();

  console.log("Waver deployed to: ", waver.address);
  console.log("Waver deployed by: ", waver.signer.address);

  fs.writeFileSync(
    "./config.js",
    ` export const contractAddress = "${waver.address}"
      export const ownerAddress = "${waver.signer.address}"
    `
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
