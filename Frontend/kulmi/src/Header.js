import React,{Component} from "react";

import {BrowserRouter, Route, Routes, NavLink, useNavigate} from 'react-router-dom';
import Cookies from "universal-cookie";

function Header(props){


    const cookies = new Cookies();
  
    const navigate = useNavigate();
  
    const endSession=()=>{
        cookies.remove('BleresiId', {path: '/'});
        cookies.remove('BleresiName', {path: '/'});
        cookies.remove('BleresiNrTel', {path: '/'});
        cookies.remove('BleresiEmail', {path: '/'});
        cookies.remove('BleresiPassword', {path: '/'});
        navigate('/home');    
    }
          return(    
              <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0.5% 3%", background: "white", width: "100%", zIndex: "1", boxShadow: '0 1px 20px rgba(0 0 0.2)'}}>
              <NavLink to="../home" className="logo" aria-label="homepage">Kulmi</NavLink>
              <nav className="main_nav">
          <ul className="nav_list">
          <li className="nav_list-item"><NavLink to="../home" className="nav_link">Home</NavLink></li>
            <li className="nav_list-item"><NavLink to="../about" className="nav_link">About</NavLink></li>
            <li className="nav_list-item"><NavLink to="../library" className="nav_link">Books</NavLink></li>
            <li className="nav_list-item"><NavLink to="../music" className="nav_link">Songs</NavLink></li>
            <li className="nav_list-item"><NavLink to="../contacts" className="nav_link">Contacts</NavLink></li>
          </ul>
        </nav>
        <nav>
          <ul className="nav_list">
           {cookies.get('BleresiId') == null &&  <li className="nav_list-item"><NavLink to="../login" className="nav_link nav_link--btn">Login</NavLink></li>}
           {cookies.get('BleresiId') != null &&  <li className="nav_list-item"><NavLink to="../menu" className="nav_link nav_link--btn">Profile</NavLink></li>}
           {cookies.get('BleresiId') == null &&  <li className="nav_list-item"><NavLink to="../register" className="nav_link nav_link--btn nav_link--btn--highlight">Register</NavLink></li>}
           {cookies.get('BleresiId') != null &&  <li className="nav_list-item"><NavLink to="../home" className="nav_link nav_link--btn nav_link--btn--highlight" onClick={endSession}>Log Out</NavLink></li>
  }
          </ul>
        </nav>
        </div>
        )
    }

    export default Header;
