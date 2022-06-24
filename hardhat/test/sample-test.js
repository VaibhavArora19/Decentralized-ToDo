const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  let deployedToDoContract, owner, addr1;
  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    const ToDoContract = await ethers.getContractFactory("ToDo");

    deployedToDoContract = await ToDoContract.deploy();
  });
  it("Should set the first task", async function () {
    await deployedToDoContract.addTask(1, "vaibhav", "hello");

    const task = await deployedToDoContract.getTask();
    const title = task[0].title;

    expect(title).to.be.equal("vaibhav");
  });
  it("should update the task", async function () {
    await deployedToDoContract.addTask(1, "vaibhav", "hello");

    await deployedToDoContract.deleteTask(1);
    const task = await deployedToDoContract.getTask();
    const title = task[0].title;

    expect(title).to.be.equal("");
    
  });

  it("should throw an error while another user try to delete a task", async function() {
    await deployedToDoContract.addTask(1, "vaibhav", "hello");

    await expect(deployedToDoContract.connect(addr1).deleteTask(1)).to.be.revertedWith("Not your task");
  })
});
