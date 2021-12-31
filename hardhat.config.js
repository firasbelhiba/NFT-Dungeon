require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
const fs = require("fs");

const privateKey = fs.readFileSync(".secret").toString();
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
(
  module.exports = {
    networks: {
      hardhat: { chainId: 1337 },
      mumbai: {
        url: `https://polygon-mumbai.infura.io/v3/${process.env.PROJECT_ID}`,
        account: [privateKey],
      },
      mainnet: {
        url: `https://polygon-mainnet.infura.io/v3/${process.env.PROJECT_ID}`,
        account: [privateKey],
      },
    },
    solidity: "0.8.4",
  }
);
