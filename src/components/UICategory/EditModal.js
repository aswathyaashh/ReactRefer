import React,{useState, useContext} from "react";   
import{UserContext} from "views/admin/Categorynew";
import Card from "./Card";
import Button from "./Button";
import classes from "./Modal.module.css";

const EditModal = (props) => {
    const [catagory, setcategory] = useState('');
    const {data, setData} = useContext(UserContext)
    
    const setCatHandler = (e) => {
        setcategory(e.target.value);
    }
    const addUserHandler = (event) => {
        event.preventDefault();
        if(catagory.trim().length === 0){
            return;
        }
        setData((data.map((data, id) => {
            if(id === props.rowId){
                data = {name : catagory, id : props.sl};
            }
            return data
        })))
        console.log(data)
        setcategory('');
        props.onEdit(false);
    };
    const closeModal = () => {
        props.onEdit(false);
    }
    return(
        <div>
            <div className={classes.backdrop} />
            <Card className={classes.modal}>
            <header className={classes.header}>
            <h2>Edit Category</h2>
            </header>
            <div className={classes.content}>
                <label htmlFor ="categoryname">Enter category name :</label>
                <input type="text" name="category" onChange={setCatHandler} defaultValue ={props.value} />
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