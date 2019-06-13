import React from "react";
import axios from 'axios';

class Register extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
      department: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  handleRegister = e => {
    e.preventDefault();
    axios
    .post("http://localhost:5001/api/register", this.state.credentials)
    .then(res => {      
      
      localStorage.setItem("token", res.data.authToken);
    })
    .then(() => this.props.history.push("/protected"))
    .catch(err => {
      console.log("login err: ", err);
      // if (err.response && err.response.status === 401) {
      //   localStorage.removeItem("token");
      // }
    });
  };

  render() {
    return (
      <div>
        {/* {this.props.loginError && <p>Error on login, try again</p>} */}
        <form onSubmit={this.handleRegister}>
          <label htmlFor="">username</label>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <label htmlFor="">password</label>
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <label htmlFor="">department</label>
          <input
            type="text"
            name="department"
            value={this.state.credentials.department}
            onChange={this.handleChange}
          />
          <button>
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
