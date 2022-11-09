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
// 0x89847Cee40203A6c68FF15383DAEef31bC16fCA2
