const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract: ", async () => {
  it("Deployment should assign the total supply of tokens to the owner", async () => {
    const [owner] = await ethers.getSigners();
    const WaverToken = await ethers.getContractFactory("WaverToken");
    const token = await WaverToken.deploy();
    await token.deployed();

    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const WaverToken = await ethers.getContractFactory("WaverToken");
    const token = await WaverToken.deploy();
    await token.deployed();

    await token.transfer(addr1.address, 50);
    expect(await token.balanceOf(addr1.address)).to.equal(50);

    await token.connect(addr1).transfer(addr2.address, 50);
    expect(await token.balanceOf(addr2.address)).to.equal(50);
  });

  it("Should mint 1000 tokens to user", async () => {
    const [owner, addr1] = await ethers.getSigners();
    const WaverToken = await ethers.getContractFactory("WaverToken");
    const token = await WaverToken.deploy();
    await token.deployed();

    await token.requestTokens(addr1.address, 1000);
    expect(await token.balanceOf(addr1.address)).to.equal(1000);
  });

  it("Should throw an error if minted more then 1 time", async () => {
    const [owner, addr1] = await ethers.getSigners();
    const WaverToken = await ethers.getContractFactory("WaverToken");
    const token = await WaverToken.deploy();
    await token.deployed();

    await token.requestTokens(addr1.address, 1000);
    expect(await token.balanceOf(addr1.address)).to.equal(1000);

    try {
      await token.requestTokens(addr1.address, 1000);
    } catch (error) {
      expect(error.message).to.include(
        "Lock time has not expired. Please try again later"
      );
    }
  });
});
