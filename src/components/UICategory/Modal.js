import React,{useState} from 'react';

import Card from './Card';
import Button from './Button';
import classes from './Modal.module.css';

const Modal = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('');

    const setCatHandler = (e) => {
        setEnteredUsername(e.target.value);
        console.log(enteredUsername)
    }
    const addUserHandler = (event) => {
        event.preventDefault();
        if (enteredUsername.trim().length === 0) {
          return;
        }
        props.onAddUser(enteredUsername);
        setEnteredUsername('');
        props.onState(false);
    };
    const closeModal = () => {
      props.onState(true);
    }
  return (
    <div>
      <div className={classes.backdrop} />
      <Card className={classes.modal}>
        <header className={classes.header}> 
          <h2>Add Catagory</h2>
        </header>
        <div className={classes.content}>
          <label htmlFor="catName">Enter catagory name :</label>
          <input type="text" onChange={setCatHandler} value={enteredUsername} />
        </div>
        <footer className={classes.actions}>
          <Button onClick={closeModal}>Close</Button>
          <Button onClick={addUserHandler}>Add</Button>
        </footer>
      </Card>
    </div>
  );
};

export default Modal;