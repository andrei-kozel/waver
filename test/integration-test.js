const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Integration test: ", async () => {
  it("Should have WVE balance", async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const WaverToken = await ethers.getContractFactory("WaverToken");
    const token = await WaverToken.deploy();
    await token.deployed();
    const tokenAddress = await token.address;

    const Waver = await ethers.getContractFactory("Waver");
    const waver = await Waver.deploy();
    await waver.deployed();
    await waver.setToken(tokenAddress);

    await token.requestTokens(addr1.address, 1000);
    await waver.checkBalance(addr1.address, 100);

    let balance = await waver.checkBalance(addr1.address, 100);
    expect(balance).to.equal(true);
    balance = await waver.checkBalance(addr1.address, 100000);
    expect(balance).to.equal(false);
  });

  it("Should pay 1 WVE for 1 like", async () => {});
});
