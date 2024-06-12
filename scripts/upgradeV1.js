const { ethers, upgrades } = require("hardhat");
const { Wallet } = require("ethers");

//const UPGRADEABLE_PROXY = "Insert your proxy contract address here";

// Ganache 
const UPGRADEABLE_PROXY = "0xe54129099aFC6c2010F59CF2415578C17068cB26"

async function main() {
   const gas = 0; 

   // Network Hardhat
   //const [wallet, otherAccount] = await ethers.getSigners();
   
   // Network Ganache or Hardhat
   const wallet = Wallet.fromPhrase("chalk dial area master candy tape mercy artwork finish kiss wreck weekend").connect(ethers.provider)
   if ("hardhat" == (await ethers.provider.getNetwork()).name)
      await ethers.provider.send("hardhat_setBalance", [
         wallet.address,
         "0x56BC75E2D63100000", // 100 ETH
      ]);


   const args  = []
   const factoryV2 = await ethers.getContractFactory("ExampleV2", wallet);
   console.log("Upgrading ExampleV1 Contract...");
   let upgrade = await upgrades.upgradeProxy(UPGRADEABLE_PROXY, factoryV2, args, {
      gasPrice: gas
   });
   
   await upgrade.waitForDeployment()
   console.log(upgrade)

   //const contract = factory.attach(await upgrade.getAddress()) 
   
   const deploymentReceipt = upgrade.deployTransaction;

   console.log("ExampleV1 Upgraded to ExampleV2");
   console.log(`
   ExampleV2 Contract Deployed To::
     - Address: ${upgrade.target}
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