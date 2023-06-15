async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const greeting = "Hello, world!";
  const version = "1.0";

  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy(greeting, version);

  console.log("Greeter deployed to:", greeter.address);
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
