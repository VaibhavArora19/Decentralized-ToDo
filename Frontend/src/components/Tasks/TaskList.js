import React from "react";
import Task from "./Task";

import classes from "./TaskList.module.css";

const TaskList = (props) => {
  if(!props.account.accountAddress){
    return <p className={classes.noTask}>Please Connect your Wallet first and switch to Rinkeby testnet!!</p>
  }
  if (props.tasks.length === 0) {
    return <p className={classes.noTask}>No Tasks added. Add Some!!</p>;
  }

  const tasks = props.tasks;
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} id = {task.id} title={task.title} description={task.description} />
      ))}
    </div>
  );
};

export default TaskList;
