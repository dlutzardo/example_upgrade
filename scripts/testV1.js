const { ethers, upgrades } = require("hardhat");
const { Wallet } = require("ethers");

const CONTRACT_ADDRESS = "0xe54129099aFC6c2010F59CF2415578C17068cB26"

async function main() {
   const gas = 0; //await ethers.provider.getGasPrice()
   
   // Network Hardhat
   //const [wallet, otherAccount] = await ethers.getSigners();
   
   // Network Ganache or Hardhat
   const wallet = Wallet.fromPhrase("chalk dial area master candy tape mercy artwork finish kiss wreck weekend").connect(ethers.provider)
   if ("hardhat" == (await ethers.provider.getNetwork()).name)
      await ethers.provider.send("hardhat_setBalance", [
         wallet.address,
         "0x56BC75E2D63100000", // 100 ETH
      ]);

   const factory = await ethers.getContractFactory("ExampleV1", wallet);

   const contract = factory.attach(CONTRACT_ADDRESS) 

   const result1 = await contract.retrieve()
   console.log(" Result Before: " + result1)
   await contract.increase()
   const result2 = await contract.retrieve()
   console.log(" Result After : " + result2)
}


main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 });