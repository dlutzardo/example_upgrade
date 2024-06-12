require("@nomicfoundation/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");

module.exports = {
  //solidity: "0.8.4",
  solidity: {
    version: "0.8.17",
    settings: {
      //evmVersion: "byzantium",
      evmVersion: "istanbul",
    },
  },

      
  hardhat: {
    
    accounts: {

      count: 1000
    },
    
   /*
    accounts: {
      mnemonic: "test test test test test test test test test test test junk",
      path: "m/44'/60'/0'/0",
      initialIndex: 0,
      count: 20,
      passphrase: "",
    },
    */
    quickstart: {
      // test accounts only, all good ;)
      accounts: [
        "0x8766947c8bcf264a7a9c02801a0b42d5204c568b2f6f8e14f19727402a9a2b4b",
        "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
        "0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f"
      ]
    },
    gas: 1800000,
  },
  networks: {
    ganache: {
      url: `http://127.0.0.1:8545`,
      chainId: 1337,
      evm: "berlin",
      // evm: "berlin",
      //  evm: "byzantium",
    },
    alastria: {
      chainId: 83584648538,
      url: "http://15.188.13.9/dd479440-4c35-41fc-ab6c-f025cf8f3623", // Wealize
      gasLimit: 30000000,
      evm: "istanbul",
    },
    alastriabesu: {
      chainId: 2020,
      url: "http://46.137.29.114:8545",
      gasLimit: 30000000,
    },
  },
  
};
