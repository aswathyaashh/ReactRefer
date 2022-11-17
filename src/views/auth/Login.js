import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory} from "react-router-dom";
import logo from "assets/img/Flexkart.png";
import "assets/styles/index.css";
import axios from "axios";
import { Result } from "postcss";
import validator from "validator";

export default function Login() 
{
  const history= useHistory();
  const initialValues = {EmailId:"",password:""};
  const[formValues, setFormValues] =useState(initialValues );
  const[formErrors, setFormErrors] =useState({} );
  const [isSubmit, setIsSubmit]= useState(false);
  



  const handleChange = (e) => {
    const {name,value}=e.target;
    setFormValues({...formValues,[name]: value});
    const regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const emailValue=e.target.value
    setFormValues(emailValue)
    if(formValues.EmailId.match(regex))
    {
      console.log(true);
    }
    else{
      console.log(false);
    }
  };
//const [email, setEmail ] = useState('')
//const [password, setPassword] = useState('')
  //const handleEmail = (e) => {
    //setEmail(e.target.value)
  //}
  //reqres dummy email and password
  //"email": "eve.holt@reqres.in",
    //"password": "cityslicka"

  //const handlePassword = (e) => {
    //setPassword(e.target.value)
  //}

  const validate = (value) => {
   
    const errors = {};
   
   
    if(!value.EmailId){
      errors.EmailId = "Email is required!";
    }
 
    if(!value.password){
      errors.password = "password is required!";
    }  else if (value.password.length < 8 ){
      errors.password= "Enter a password between 8-10 characters";
    }
    else if (value.password.length > 10 ){
      errors.password= "Enter a password between 8-10 characters";
    }
    return errors;

  };
const handleApi = () => {
  console.log({formValues});
  setFormErrors(validate(formValues));
  setIsSubmit(true);
};
useEffect(() => 
{
  if(Object.keys(formErrors).length === 0 && isSubmit){

    axios({
      url: 'https://localhost:7093/api/Login/AdminLogin',
      method: 'POST',
      data: { EmailId:formValues.EmailId,
        password:formValues.password}
     
  })
    .then(result => {
      console.log(result.data) 
      alert("successfuly Logged in")
      localStorage.setItem("token",result.data.token)
      history.push("/admin/Dashboard")
    })
    .catch(error => {
      alert("service error")
      console.log(error)
    })
  }

    
 
  // axios.post('https://localhost:7093/api/Login/AdminLogin',{
  //   email:formValues.email,
  //   password:formValues.password
  // })

},[formErrors]);


  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="logos" style={{ display: "flex" }}>
                  <img alt="..." className="Logo" src={logo} />
                  <h1 className="Title">FlexKart</h1>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                    name="EmailId"
                      type="email" value={formValues.EmailId} onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>
                  <p>{formErrors.EmailId}</p>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Password
                    </label>
                    <input
                    name="password"
                      type="password" value={formValues.password} onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"/>
                  </div>
                  <p>{formErrors.password}</p>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button" onClick={handleApi}>
                      Sign In
                    </button>
                  </div>
                  <div className="Forgot">
                        <Link to="/auth/register" className="text-blueGray-200 ">
                          <small className="Forgot">Forgot password ?</small>
                        </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
