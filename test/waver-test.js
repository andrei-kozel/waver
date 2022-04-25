const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Waver contract tests:", () => {
  it("Should create a wave and return the right amount of waves", async () => {
    const Waver = await ethers.getContractFactory("Waver");
    const waver = await Waver.deploy();
    await waver.deployed();

    // no waves, empty array
    let waves = await waver.fetchWaves();
    expect(waves.length).to.equal(0);

    // create a wave, should return 1
    await waver.createWave("wave 1");
    waves = await waver.fetchWaves();
    expect(waves.length).to.equal(1);

    // create a wave, should return 2
    await waver.createWave("wave 2");
    waves = await waver.fetchWaves();
    expect(waves.length).to.equal(2);
  });
});
