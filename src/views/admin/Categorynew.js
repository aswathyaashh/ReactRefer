import React, {useState} from "react";
// import Datajson from "src/components/Category/Data.json";
import Header from "components/Category/Header";
import Table from "components/Category/Table";
// import TableRow from "components/Category/TableRow";
import "../../components/Category/Header.css";
import Data from "components/Category/Data.json";
import "views/admin/Categorynew.css";

function Categorynew(){
        const [data, setData] = useState(Data);
        const addUserHandler = (catName) => {
            setData((prevUsersList) => {
                return [
                    ...prevUsersList,
                    { name: catName, id: data.length + 1 },
                        ];
                });
        };

     return (
        <>
        <div className="Categorynew">
        <Header addUser={addUserHandler}/>
        <Table data={data}/>
        </div>
        </>
//         <>
//     <div>
//     {/*<div className='data'>
//         <Datajson/>
//     </div>*/}
//     <div className='header'>
//         <Header/>
//     </div>
   
//    <div className='table'>
//         <Table/>
//     </div>
//     <div className='tablerow'>
//         <TableRow/>
//     </div>
//     <div className="table">
        

//     </div>
//     </div> 
    
//         </>
);
}
export default Categorynew;