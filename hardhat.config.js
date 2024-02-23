require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/473ac80c76404bdba5ec3e205d1bd585",
      accounts: ["0x7f9a7e6e8453d1f12160a1a31e8a861a8f1f41a5863a17f896150237d7c37e9b"],
      // wallet: ["0xF351860E64C092f2e0148705FF452F7eA68eb1a8"]
    }
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};