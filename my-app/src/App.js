import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
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
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
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
