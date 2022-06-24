import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import TaskList from "./components/Tasks/TaskList";
import Button from "./components/UI/Button";
import FormModal from "./components/UI/FormModal";
import TaskContext from "./context/task-context";
import { contractAddress, ABI } from "../src/constants/index";
import {ethers} from 'ethers';

function App() {
  const [isHidden, setIsHidden] = useState(true);
  const [tasksArray, setTasksArray] = useState([]);
  const [account, setAccount] = useState({
    isConnected: false,
    accountAddress: null,
    signer: null,
    contract: null,
    contractAddress: contractAddress,
    abi: ABI,
    provider: null
  });

  useEffect(() => {
    if(account.isConnected){
      getTasks();
    }
  }, [account.isConnected])



  const getTasks = async () => {
    const totalTasks = await account.contract.getTask();

    const tasks = totalTasks.filter((task) =>  account.accountAddress.toUpperCase() === task.myAddr.toUpperCase());
    setTasksArray(tasks);
  }

  const modalHandler = () => {
    
    return setIsHidden(true);
  };

  const addTaskHandler = async (newTask) => {
    
    setIsHidden(true);
    const tx = await account.contract.addTask(newTask.id, newTask.title, newTask.description);
    
    await tx.wait();

    getTasks();
  };

  const showModalorConnectWallet = async () => {

    if (account.isConnected) {

      return setIsHidden(false);
    
    } else if (window.ethereum && !account.isConnected) {
        
        const result = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(account.contractAddress, account.abi, signer);
      console.log(result);
      setAccount((prevState) => {
        return {
          ...prevState, 
          isConnected:true,
          accountAddress: result[0],
          provider:provider,
          signer: signer,
          contract:contract
        }
      })
    }
  };

  const removeTaskHandler = async (taskToRemove) => {
   const tx =  await account.contract.deleteTask(taskToRemove.id);
    
   await tx.wait();

   getTasks();
  };
  return (
    <TaskContext.Provider
      value={{ DUMMY_TASKS: tasksArray, onRemove: removeTaskHandler }}
    >
    <Navbar name="Task Manager" />
     <p style={{textAlign: "center", fontFamily: "'Charis SIL', serif"}}>{account.isConnected ? `Address: ${account.accountAddress}` : ''}</p>
      <Button
        name={account.isConnected ? "Add Tasks" : "Connect Wallet"}
        onClick={showModalorConnectWallet}
      />
      <TaskList tasks={tasksArray} account = {account}/>
      {!isHidden && (
        <FormModal onClick={modalHandler} addTask={addTaskHandler}/>
      )}
    </TaskContext.Provider>
  );
}

export default App;
