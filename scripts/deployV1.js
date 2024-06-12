const { ethers, upgrades } = require("hardhat");
const { Wallet } = require("ethers");

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
   console.log(`Deploying ExampleV1 contract in ${(await ethers.provider.getNetwork()).name}...`);
   const args  = [10]
   const proxy = await upgrades.deployProxy(factory, args , {
      txOverrides: { gasLimit: 30000000, txValue: 0 } ,
      initializer: "initialValue",
   });
   await proxy.waitForDeployment()

   //const contract = factory.attach(await proxy.getAddress()) 
   
   const deploymentReceipt = await proxy.deploymentTransaction()?.wait(1);

   console.log(`
   ExampleV1 Contract deployed to:
     - Address: ${proxy.target}
     - Arguments: ${args}
     - deployTimestamp: ${await getContractTimestampByBlockHash(deploymentReceipt.blockHash)}
     - deployTxHash: ${deploymentReceipt.hash}
 `);
}

const getContractTimestampByBlockHash = async (blockHash) => {
   const timestampSeconds = (await ethers.provider.getBlock(blockHash)).timestamp;
   return new Date(timestampSeconds * 1000).toISOString(); 
 };

main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 });