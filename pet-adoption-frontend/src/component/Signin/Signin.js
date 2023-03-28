import React, { Component } from "react";

import AuthContexts from "../context/authContext";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { logIn } = this.context;

    const logInInfo = this.state;

    logIn(logInInfo);
  };

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Email:</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Log In
        </button>
      </form>
    );
  }
}

LoginForm.contextType = AuthContexts;

export default LoginForm;
