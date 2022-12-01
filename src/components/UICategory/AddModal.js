import React,{useState, useContext} from 'react';
import {UserContext} from "views/admin/Categorynew";
import Card from './Card';
import Button from './Button';
import classes from './Modal.module.css';

const AddModal = (props) => {
    const [category, setEnteredUsername] = useState('');
    const {data, setData} = useContext(UserContext)

    const setCatHandler = (e) => {
        setEnteredUsername(e.target.value);
        console.log(category)
    }
    const addUserHandler = (event) => {
        event.preventDefault();
        if (category.trim().length === 0) {
          return;
        }
        setData((prevUserList) => {
          return[
            ...prevUserList,
            {name : category, id : data.length + 1},
          ];
        });
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
          <input type="text" onChange={setCatHandler} value={category} />
        </div>
        <footer className={classes.actions}>
          <Button onClick={closeModal}>Close</Button>
          <Button onClick={addUserHandler}>Add</Button>
        </footer>
      </Card>
    </div>
  );
};

export default AddModal;