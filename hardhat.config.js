require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    //  mumbai: {
    //    url: "https://rpc-mumbai.maticvigil.com",
    //    accounts: [process.env.PRIVATE_KEY]
    //  }
  },
};
