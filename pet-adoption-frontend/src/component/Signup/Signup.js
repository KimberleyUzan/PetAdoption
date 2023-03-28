import React, { Component } from "react";
import AuthContexts from "../context/authContext";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  state = {
    firstName: "",
    lastName: "",
    email: "",
    photo: "",
    password: "",
    confirmPassword: "",
    photo: "",
  };

  // img url

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const image = event.target.image.files[0];
    // img code

    const formData = new FormData();
    formData.append("image", image);
    const { signUp, logIn } = this.context;
    const url =
      "https://api.imgbb.com/1/upload?key=c993754e5e7bdf8ca9412defbbd79642";
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          /* const userInfo = {
            photo: imageData.data.url,
          }; */

          if (this.state.password === this.state.confirmPassword) {
            const infos = {
              email: this.state.email,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              photo: imageData.data.url,
              password: this.state.password,
            };
            signUp(infos);
          } else {
            alert("Password is wrong");
          }
        }
      });
  };

  render() {
    return (
      <div className="Signup">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              required
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="lastName">Last Name:</label>
            <input
              required
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="email">Email Address:</label>
            <input
              required
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="photo">Photo:</label>
            <input
              required
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={this.handleFileSelect}
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="password">Password:</label>
            <input
              required
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              required
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}
Signup.contextType = AuthContexts;
export default Signup;
