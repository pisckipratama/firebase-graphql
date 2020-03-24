import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postUser } from '../actions'

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Name: "",
      Age: "",
      userName: ""
    }

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserNameChange(event) {
    this.setState({ userName: event.target.value });
  }

  handleNameChange(event) {
    this.setState({ Name: event.target.value });
  }

  handleAgeChange(event) {
    this.setState({ Age: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.userName && this.state.Name && this.state.Age) {
      this.props.postUser(this.state.userName, this.state.Name, this.state.Age)
      this.setState({ userName: "", Name: "", Age: "" });
    }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <label htmlFor="userName" className="col-sm-2 col-form-label">userName</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="userName" name="userName" value={this.state.userName} onChange={this.handleUserNameChange} placeholder="username" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="Name" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="Name" name="Name" value={this.state.Name} onChange={this.handleNameChange} placeholder="name" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="Age" className="col-sm-2 col-form-label">Age</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="Age" name="Age" value={this.state.Age} onChange={this.handleAgeChange} placeholder="age" />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">Tambah</button>
          </div>
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  postUser: (userName, Name, Age) => dispatch(postUser(userName, Name, Age))
})

export default connect(
  null,
  mapDispatchToProps
)(UserForm)