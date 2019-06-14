import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getUsers} from "../actions";

class UsersList extends Component {

  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    return (
      <div>      
        {this.props.fetchingData && <p>Loading...</p>}

        <ul>{this.props.users.map(user => <li key={user.id}>{user.username}</li> )}</ul>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users, fetchingData: state.fetchingData}
}

export default connect(mapStateToProps, {getUsers})(UsersList);