import React, { Component } from 'react';
import axios from "axios";

class UsersList extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    axios
  .get("http://localhost:5001/api/users", {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => {
      // console.log(res);
      
      this.setState({users: res.data })
    })
    .catch(err => console.log(err));
    
  }

  render() {
    return (
      <div>      

        <ul>{this.state.users.map(user => <li key={user.id}>{user.username}</li> )}</ul>

      </div>
    );
  }
}

export default UsersList