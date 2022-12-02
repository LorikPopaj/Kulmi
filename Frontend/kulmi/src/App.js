import logo from './logo.svg';
import './App.css';
import Home from './Home';
import {Objekti} from './Objekti';
import {Qyteti} from './Qyteti';
import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';
import {Lagjja} from './Lagjja';
import {Imazhet} from './Imazhet';
import {Lloji} from './Lloji';
import {Ofertat} from './Ofertat';
import {NrIDhomave} from './NrIDhomave';
import {Banjo} from './Banjo';
import {Stafi} from './Stafi';
import {Kolonat} from './Kolonat';
import {Bleresi} from './Bleresi';
import {Shitesi} from './Shitesi';
import {Porosia} from './Porosia';
import {Statusi} from './Statusi';
import {Kontaktet} from './Kontaktet';


function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-ceneter m-3">
        React JS Frontend
      </h3>
      <nav className="navbar navbar-expend-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/objekti">
              Objekti
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/qyteti">
              Qyteti
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/lagjja">
            Lagjja
            </NavLink>
          </li>  
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/imazhet">
            Imazhet
            </NavLink>
          </li>  
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/lloji">
            Lloji
            </NavLink>
          </li>  
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/ofertat">
            Ofertat
            </NavLink>
          </li>   
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/nrIDhomave">
            NrIDhomave
            </NavLink>
          </li>   
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/banjo">
            Banjo
            </NavLink>
          </li>  
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/stafi">
            Stafi
            </NavLink>
          </li> 
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/kolonat">
            Kolonat
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/bleresi">
            Bleresi
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/shitesi">
            Shitesi
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/porosia">
            Porosia
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/statusi">
            Statusi
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/kontaktet">
            Kontaktet
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/objekti' element={<Objekti/>}/>
        <Route path='/qyteti' element={<Qyteti/>}/>
        <Route path='/lagjja' element={<Lagjja/>}/>
        <Route path='/imazhet' element={<Imazhet/>}/>
        <Route path='/lloji' element={<Lloji/>}/>
        <Route path='/ofertat' element={<Ofertat/>}/>
        <Route path='/nrIDhomave' element={<NrIDhomave/>}/>
        <Route path='/banjo' element={<Banjo/>}/>
        <Route path='/stafi' element={<Stafi/>}/>
        <Route path='/kolonat' element={<Kolonat/>}/>
        <Route path='/bleresi' element={<Bleresi/>}/>
        <Route path='/shitesi' element={<Shitesi/>}/>
        <Route path='/porosia' element={<Porosia/>}/>
        <Route path='/statusi' element={<Statusi/>}/>
        <Route path='/kontaktet' element={<Kontaktet/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
