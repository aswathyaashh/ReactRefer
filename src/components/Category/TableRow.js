import React from "react"; 
import './TableRow.css'

const TableRow = (props) => {
    return(
       <li className="category-table-row">
            <div className = "col">{props.sl}</div>
            <div className = "col">{props.cat}</div>
            <div className = "col">
                <i className = "fa-solid fa-pen-to-sqaure"></i>
                <i className = "fa-solid fa-trash"></i>
            </div>
        </li>
    )
}
export default TableRow