import React,{useState, useContext} from 'react';
import {UserContext} from "views/admin/CategoryPage";
import Card from './Card';
import Button from './Button';
import classes from './Modal.module.css';
import axios from 'axios';

const AddModal = (props) => {
  const [catagory, setCatagory] = useState('');
  const [success, setSuccess] = useState();
  const {setResponse} = useContext(UserContext)
 
  const Url = `https://localhost:7093/api/Category/CategoryName/${catagory}`
  const Add_Url = `https://localhost:7093/api/Category/Add`
  let token = localStorage.getItem("token");

  const setCatHandler = (e) => {
    setCatagory(e.target.value);
  }
 
  const addUserHandler = async(event) => {
      event.preventDefault();

      if (catagory.trim().length === 0) {
        return;
      }
     
      const data = {categoryName : catagory}
      await axios({
        url: Url ,
        method: "get",
        headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        },
        })
        .then((response) =>{
        setSuccess(response.data.success)
        if(response.data.success===false){ 
          axios.post(Add_Url, data)
          setResponse(Math.random())
          setCatagory('');
          props.onState(false);
        }
      })
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
          <input type="text" onChange={setCatHandler} value={catagory} required={true}/>
          {success &&<p>category already exists</p>}
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