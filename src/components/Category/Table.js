import React from "react";
import './Table.css'
import TableRow from './TableRow'
import {useContext} from "react";
import {UserContext} from "views/admin/Categorynew";



const Table = () => {
    const {data} = useContext(UserContext)

    return(
        <div className = "category-table">
            <li className = "table-header">
                <div className = "col">Sl.No.</div>
                <div className = "col">Category Name</div>
                <div className = "col">Actions</div>
            </li>
            {
                data.map((user,id) => {
                    return <TableRow
                        rowId = {id}
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