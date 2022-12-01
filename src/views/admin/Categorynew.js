import React, {useState, createContext} from "react";
// import Datajson from "src/components/Category/Data.json";
import Header from "components/Category/Header";
import Table from "components/Category/Table";
// import TableRow from "components/Category/TableRow";
import Data from "components/Category/Data.json";
import "views/admin/Categorynew.css";

export const UserContext = createContext();

function Categorynew(){
        const [data, setData] = useState(Data);

     return (
        <>
        <div className="Categorynew">
            <UserContext.Provider value={{data, setData}}>
            <Header />
        <Table />
        </UserContext.Provider>
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