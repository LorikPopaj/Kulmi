import React, {useState} from "react";

import {BrowserRouter, Route, Routes, NavLink, useNavigate} from 'react-router-dom';
import Cookies from "universal-cookie";
import axios from "axios";
import md5 from "md5";

function Login (props) {

const navigate = useNavigate();
const baseUrl = "http://localhost:7256/api/Bleresi";
const cookies = new Cookies();

const [form, setForm]=useState({
  Username:'',
  UPassword:''
});
  const handleChange=e=>{
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value
    });
    console.log(form);
  }

  const startSession=async()=>{
    await axios.get(baseUrl+'/'+form.BleresiEmail+'/'+form.BleresiPassword)
    .then(response=>{
      return response.data;
    }).then(response=>{
      if(response.length>0){
        var message=response[0];
        cookies.set('BleresiId', message.BleresiId, {path: '/'});
        cookies.set('BleresiName', message.BleresiName, {path: '/'});
        cookies.set('BleresiNrTel', message.BleresiNrTel, {path: '/'});
        cookies.set('BleresiEmail', message.BleresiEmail, {path: '/'});
        cookies.set('BleresiPassword', message.BleresiPassword, {path: '/'});

        alert('Welcome ' + message.BleresiName);
        navigate('/menu');   
      }else{
        alert('Username or Password are incorrect.');
      }
    })
    
    
    .catch(error=>{
      console.log(error);
    })
  }

        return(<div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src="http://localhost:7256/Photos/img-01.png" alt="IMG" />
            </div>
    
            <form id="form" className="login100-form validate-form">
              <span className="login100-form-title" style={{color: "#3db1c0"}}>
                Member Login
              </span>
    
              <div id="not-valid-username" className="not-valid"></div>
                        <div className="wrap-input100 validate-input">
                <input style={{border: "2px solid gray"}} id="username" className="input100" type="text" name="Username" placeholder="Username" onChange={handleChange}/>
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <img src="http://localhost:7256/Photos/username.png" style={{width: "30px", height:"30px", opacity:"80%", marginLeft:"-5%"}}></img>		
                </span>
              </div>
              <div id="not-valid-email" className="not-valid"></div>
              <div className="wrap-input100 validate-input">
                <input style={{border: "2px solid gray"}} id="password" className="input100" type="password" name="UPassword" placeholder="Password" onChange={handleChange}/>
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <img src="http://localhost:7256/Photos/password.png" style={{width: "30px", height:"30px", opacity:"80%", marginLeft:"-5%"}}></img>
                </span>
              </div>
              <div id="not-valid-password" className="not-valid"></div>
              
              <div className="container-login100-form-btn">
                <button style={{border: "3px solid #3db1c0"}} id="sub-button" className="login100-form-btn" type="button" onClick={startSession}>
                  Login
                </button>
              </div>
              <div className="centered">
              <div className="text-center p-t-12">
                <span className="txt1">
                  Forgot 
                </span><span> </span>
                <a className="txt2" href="#">
                  Username / Password?
                </a>
              </div>
    
              <div className="text-center p-t-136">
              <NavLink to="../Register" className="txt2">
                  Register
                </NavLink>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
        )
    }

    export default Login; 