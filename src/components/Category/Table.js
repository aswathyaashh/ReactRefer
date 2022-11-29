import React from "react";
import './Table.css'
import TableRow from './TableRow'


const Table = (props) => {
    return(
        <div className = "category-table">
            <li className = "table-header">
                <div className = "col">Sl.No.</div>
                <div className = "col">Category Name</div>
                <div className = "col">Actions</div>
            </li>
            {
                props.data.map((user,id) => {
                    return <TableRow
                        key = {id}
                        sl = {user.id}
                        cat = {user.name}
                    />
                }
                )
            }
        </div>
    )
}
export default Table