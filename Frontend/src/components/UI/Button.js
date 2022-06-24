import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <div className={classes.centered}>
    <button className={classes.button} onClick = {props.onClick}>
    {props.name}
    </button>
    </div>
  );
};

export default Button;
