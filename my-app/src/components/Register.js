import React from "react";
import { connect } from "react-redux";
import { register } from "../actions";

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
    this.props
      .register(this.state.credentials)
      .then(res => (res === false) ? null : this.props.history.push("/users"))
  };

  render() {
    return (
      <div>
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
        {this.props.registerError && <p>Error registering, try again</p>}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    registerError: state.registerError
  };
};

export default connect(
  mapStateToProps,
  { register }
)(Register);
