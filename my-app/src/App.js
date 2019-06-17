import React, { Component } from 'react';
import { withRouter, Route, NavLink } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import UsersList from "./components/UsersList";
import './App.css';

class App extends Component {

  logout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login")
  }

  render() {
    return (
        <div>
        <button onClick={this.logout}>Log Out</button>
        <ul className='nav'>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>
        </ul>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/users" component={UsersList} />
        </div>
    );
  }
}

export default withRouter(App);
