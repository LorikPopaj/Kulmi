import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {Objekti} from './Objekti';
import {Qyteti} from './Qyteti';
import {BrowserRouter, Route, Switch, NavLink} from './react-router-dom';

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
        </ul>
      </nav>

      <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/objekti' component={Objekti}/>
        <Route path='/qyteti' component={Qyteti}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
