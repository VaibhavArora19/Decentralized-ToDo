const {ethers} = require("hardhat");

const main = async () => {

    const ToDoContract = await ethers.getContractFactory("ToDo");

    const DeployedToDoContract = await ToDoContract.deploy();

    console.log("Contract address is: ", DeployedToDoContract.address);

};


main()
.then(() => process.exit(0))
.catch((error) => {
    console.log(error);
    process.exit(1);
})
// 0x3B3D46aAb1B7e365719a5a383b2cC0bb9819B377
