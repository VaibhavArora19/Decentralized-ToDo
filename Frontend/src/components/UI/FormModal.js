import React from "react";
import classes from "./FormModal.module.css";
import Button from "./Button";
import { useRef } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const Modal = (props) => {
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();

  const newTaskHandler = (event) => {
    event.preventDefault();
    const id = Math.floor(Math.random()*1000);
    props.task({
      id: id,
      title: titleInputRef.current.value,
      description: descriptionInputRef.current.value,
    });
  };

  return (
    <div className={classes.modal}>
      <div className={classes.heading}>
        <h2>Add Task</h2>
      </div>
      <form className={classes.text} onSubmit={newTaskHandler}>
        <label htmlFor="Title">Title</label>
        <input
          type="text"
          id="Title"
          placeholder="Enter title"
          ref={titleInputRef}
        />
        <label htmlFor="Description">Description</label>
        <textarea
          cols="40"
          rows="5"
          id="Description"
          placeholder="Description"
          ref={descriptionInputRef}
        />
        <Button name="Add" />
      </form>
    </div>
  );
};

const FormModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Modal task={props.addTask} />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default FormModal;
