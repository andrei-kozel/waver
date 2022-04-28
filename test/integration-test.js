const { expect } = require("chai");
const { ethers } = require("hardhat");

const contentHash1 =
  "0x0000000000000000000000000000000000000000000000000000000000000001";
const contentHash2 =
  "0x0000000000000000000000000000000000000000000000000000000000000002";

describe("Waver & WVE", async () => {
  let waver = null;
  let token = null;

  before(async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the token contract
    const WaverToken = await ethers.getContractFactory("WaverToken");
    token = await WaverToken.deploy();
    await token.deployed();

    // Get contract address after deployment
    const tokenAddress = await token.address;

    // Deploy the waver contract
    const Waver = await ethers.getContractFactory("Waver");
    waver = await Waver.deploy();
    await waver.deployed();

    // Set the token address
    await waver.setToken(tokenAddress);

    // Request balance
    await token.requestTokens(addr1.address, 1000000);
    await token.requestTokens(addr2.address, 1000000);

    // addr1 and addr2 now have 1000 tokens

    await waver.createWave(contentHash1);
    await waver.createWave(contentHash2);
  });

  describe("Integration tests", async () => {
    it("Should have WVE balance", async () => {
      const [owner, addr1, addr2] = await ethers.getSigners();

      let balance = await waver.checkBalance(addr1.address, 100);
      expect(balance).to.equal(true);
      balance = await waver.checkBalance(addr2.address, 100);
      expect(balance).to.equal(true);
      balance = await waver.checkBalance(addr1.address, 100000000);
      expect(balance).to.equal(false);
    });

    it("Should pay 1 WVE for 1 like", async () => {
      const [owner, addr1, addr2] = await ethers.getSigners();
      const balance = await token.balanceOf(addr1.address);
      console.log(balance);

      await waver.connect(addr1).like(owner.address, contentHash1);
      expect(await token.balanceOf(owner.address)).to.equal(1);
    });
  });
});
