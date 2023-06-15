const { expect } = require("chai");

describe("Greeter", function() {
  it("Should return the initial greeting", async function() {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Initial greeting");

    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Initial greeting");
  });

  it("Should change the greeting", async function() {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Initial greeting");

    await greeter.deployed();

    await greeter.setGreeting("New greeting");
    expect(await greeter.greet()).to.equal("New greeting");
  });
});
