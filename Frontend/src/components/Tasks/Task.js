import { useContext } from 'react';
import TaskContext from '../../context/task-context';
import classes from './Task.module.css';

const Task = (props) => {
  const ctx = useContext(TaskContext);
  
  
  const deleteTaskHandler = () => {
    ctx.onRemove(props);
  };

  return (
    <div className={classes.taskitem}>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <button onClick = {deleteTaskHandler}><i class="fa-regular fa-circle-trash fa-2x"></i></button>
    </div>
  );
};

export default Task;
