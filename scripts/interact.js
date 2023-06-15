async function main() {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");
  
    const greeting = await greeter.greet();
    console.log("Current greeting:", greeting);
  
    await greeter.setGreeting("New greeting");
  
    const newGreeting = await greeter.greet();
    console.log("New greeting:", newGreeting);
  }
  
  main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
  });
  