import { useEffect } from "react";
import { useHistory } from "react-router";
// export function runLogoutTimer(dispatch,timer){
//     setTimeout(() => {
//         dispatch(logout())
//     },5000);
// }
function ServicesAdmin(){
    const navigate= useHistory()

useEffect(() =>{
    if(!localStorage.getItem("Token")){
        navigate.push("/Login")
    }
},[])













}
