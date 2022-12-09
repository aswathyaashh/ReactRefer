import React, {useState, createContext, useEffect} from "react";
// import Datajson from "src/components/Category/Data.json";
import Header from "components/Category/Header";
import Table from "components/Category/Table";
// import TableRow from "components/Category/TableRow";
import Data from "components/Category/Data.json";
//import data from "/data.json";
import "views/admin/Categorynew.css";
import { TokenCheck } from "shared/Tokenchecker/TokenChecker";
import { Category_GET_Url } from "shared/Url/Url";
import  axios  from "axios";


export const UserContext = createContext();


function Categorynew(){
        const [category, setCategory] = useState([]);
        const [data, setData] = useState(Data);
       // const categoryGet = (Url = "https://localhost:7093/api/Category") => {
        //     return {
        //         fetchByName : () => axios.get(Url),
        //     };
        // };

       // const refreshCategory = () => {
           // categoryGet()
            //.then((res) => setCategory(res.data))
            //.catch((error) => {
             //   console.log(error);
            //});
       // };

       
        

        useEffect(() => {
            const Url = "https://localhost:7093/api/Category"
            //const refreshList = () => {
            let token = localStorage.getItem("token");
            axios({
            url: Url ,
            method: "get",
            headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            },
            }).then(function (response) {
            console.log(response.data.categoryName);
            setCategory(response.data);
            });
         },[]);
        
            

     return (
        <>
        <div className="Categorynew">
            <UserContext.Provider value={{data, setData}}>
            <Header />
        <Table />
        </UserContext.Provider>
        </div>
        </>
);
}
export default Categorynew;