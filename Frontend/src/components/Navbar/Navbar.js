import classes from "./Navbar.module.css";

const Navbar = (props) => {
  return (
    <nav className={classes.navbar}>
      <h1>{props.name}</h1>
      <span>
        <i class="fa-solid fa-list-check fa-2x"></i>
      </span>
    </nav>
  );
};

export default Navbar;
