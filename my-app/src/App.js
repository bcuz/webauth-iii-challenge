import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import UsersList from "./components/UsersList";
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <ul className='nav'>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/protected">Protected Page</NavLink>
          </li>
        </ul>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/protected" component={UsersList} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
