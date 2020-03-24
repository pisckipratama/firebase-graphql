import React, { Component } from 'react';
import User from './UserActive';
import { connect } from 'react-redux';
import { loadUser } from '../actions'

class UserList extends Component {

  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const nodes = this.props.users.map((item, index) => {
      return (
        <User
          key={index}
          userName={item.userName}
          Name={item.Name}
          Age={item.Age}
          sent={item.sent}
        />)
    })
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {nodes}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users
})

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(loadUser())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)