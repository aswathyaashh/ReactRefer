import React,{useState, useContext} from "react";   
import{UserContext} from "views/admin/CategoryPage";
import Card from "./Card";
import Button from "./Button";
import classes from "./Modal.module.css";
import axios from "axios";

const EditModal = (props) => {
    const [catagory, setcatagory] = useState('');
    const {setResponse} = useContext(UserContext)
    const [success,setSuccess] = useState();

    const editUrl = `https://localhost:7093/api/Category/${props.sl}`
    const Url = `https://localhost:7093/api/Category/CategoryName/${catagory}`
    let token = localStorage.getItem("token");

    const setCatHandler = (e) => {
        setcatagory(e.target.value);
    }

    const addUserHandler = async(event) => {
        event.preventDefault();
        if (catagory.trim().length === 0) {
          return;
        }
        
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
              console.log('added')
              axios.put(editUrl, {
                categoryName : catagory
            })
              .then(res => {setResponse(res.data)})
              setcatagory('');
              props.onEdit(false);
          }
        })
    };

    const closeModal = () => {
      props.onEdit(false);
    }

    return (
      <div>
        <div className={classes.backdrop} />
        <Card className={classes.modal}>
          <header className={classes.header}> 
            <h2>Edit Catagory</h2>
          </header>
          <div className={classes.content}>
            <label htmlFor="catName">Enter catagory name : </label>
            <input type="text" name='catagory' onChange={setCatHandler} defaultValue={props.value} />
            {success &&<p>category already exists</p>}
          </div>
          <footer className={classes.actions}>
            <Button onClick={closeModal}>Close</Button>
            <Button onClick={addUserHandler}>Save</Button>
          </footer>
        </Card>
      </div>
    );
  };
  
  export default EditModal;