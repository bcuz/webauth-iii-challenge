import React from "react";
import { connect } from "react-redux";
import { login } from "../actions";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
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

  handleLogin = e => {
    e.preventDefault();

    this.props
      .login(this.state.credentials)
      .then(() => this.props.history.push("/users"));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleLogin}>
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
          <button>
            Log in
          </button>
        </form>
        {this.props.loginError && <p>Error on login, try again</p>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginError: state.loginError
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);