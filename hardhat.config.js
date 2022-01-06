require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
const fs = require("fs");
const privateKey =
  fs.readFileSync(".secret").toString().trim() || "516549826546826516842985";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.PROJECT_ID}`,
      //  url: "https://rpc-mumbai.matic.today",
      accounts: [privateKey],
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/c41b490b41d94038be111f8ba4221a08",
      accounts: [privateKey],
    },
    /*
    matic: {
      // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    }
    */
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
