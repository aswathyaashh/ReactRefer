import React from "react";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import logo from "assets/img/Flexkart.png";
import "assets/styles/index.css";
import axios from "axios";
import { Result } from "postcss";

export default function Login() {
  const Navigate= useNavigate()
const [email, setEmail ] = useState('')
const [password, setPassword] = useState('')
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

const handleApi = () => {
  console.log({email,password})
  axios.post('https://reqres.in/api/login',{
    email:email,
    password:password
  })
    .then(result => {
      console.log(result.data)
      alert("success")
      localStorage.setItem("token",result.data.token)
    })
    .catch(error => {
      alert("service error")
      console.log(error)
    })

}


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
                      type="email" value={email} onChange={handleEmail}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Password
                    </label>
                    <input
                      type="password" value={password} onChange={handlePassword}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"/>
                  </div>
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
