import React, {useState} from 'react'
import './Header.css'
import Modal from "components/UICategory/Modal.js"
// import { useEffect } from 'react'


const Header = (props) => {
    const [state, setState] = useState(false);
    const stateHandler = () => {
    state ? setState(false) : setState(true);
    console.log(state)
  }
  const onAddUser = (catName) => {
    props.addUser(catName);
  }

return(
    <div className = 'header'>
        {state && <Modal onAddUser={onAddUser} onState ={stateHandler}/>}
        <h1>CATEGORIES</h1>
        <button type = "button" className = 'btn btn-primary' onClick = {stateHandler}>
            <i className = 'fa-solid fa-plus'></i>
                Add Category
        </button>

        <div className = 'input-group'>
            <input type = "text" className = "form-control" placeholder = "Search"/>
            <div className = 'input-type-append'>
                <button className = 'btn btn-secondary' type = "button">
                    <i className = 'fa fa-search'></i>    
                </button> 
            </div>
        </div>
    </div>
)
}
export default Header