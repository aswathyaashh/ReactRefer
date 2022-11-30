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
        <div className = 'input-group clearfix bg-secondary'>
            <div className = 'alignClass input-group-append float-start'>
                <input type = "text" className = "form-control" placeholder = "Search"/>
                    <button className = 'btn btn-secondary' type = "button">
                    <i className = 'fa fa-search'></i>    
                    </button> 
            </div>
                    <button type = "button" className = 'btn btn-primary btnalign float-end'  onClick = {stateHandler}>
                    <i className = 'fa-solid fa-plus'></i>
                    Add Category
                    </button>
        </div>
    </div>
)
}
export default Header