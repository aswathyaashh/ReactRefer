import React, { useState } from "react"; 
import './TableRow.css'
import EditModal from "components/UICategory/EditModal.js"

const TableRow = (props) => {
    const [edit, setEdit] = useState(false)

    const onEdit = () => {
        setEdit(true);
    }
    return(
        <div>
            {edit && <EditModal onEdit = {setEdit} value = {props.cat} sl = {props.sl} rowId = {props.rowId}/>}
       <li className="category-table-row">
            <div className = "col">{props.sl}</div>
            <div className = "col">{props.cat}</div>
            <div className = "col">
                <i className = "fa-solid fa-pen"></i>
                <i className = "fa-solid fa-trash"></i>
            </div>
        </li>
        </div>
    )
}
export default TableRow;