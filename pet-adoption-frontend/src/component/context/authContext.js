import React, { Component } from "react";
import { toast } from "react-hot-toast";

const AuthContexts = React.createContext();
export class AuthContext extends Component {
  state = {
    sign: {},
  };
  signUp = (info) => {
    this.setState({ sign: info });
    fetch("http://localhost:5002/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User Data", data);
        if (data.acknowledged) {
          localStorage.setItem("userEmail", JSON.stringify(info?.email));
          toast.success("Successfully Sign Up!");
          window.location.href = '/profile';
        }
      });
  };
  logIn = (info) => {
    fetch("http://localhost:5002/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const userEmail = JSON.parse(localStorage.getItem('userEmail'));
        console.log(userEmail);
        if (userEmail == data.email) {
          localStorage.setItem("userEmail", JSON.stringify(info?.email));
          toast.success("Successfully logged in!");
          window.location.href = '/profile';
        }
      });
  };
  logOut = () => {
    localStorage.clear();
    const userEmail = JSON.parse(localStorage.getItem('userEmail'));
    if (userEmail == null) {
      toast.success("Logout Successful!");
      window.location.href = '/';
    }
  };

  render() {
    const { sign } = this.state;
    const { logIn, signUp, logOut } = this;
    console.log(sign);

    return (
      <>
        <AuthContexts.Provider value={{ logIn, signUp, sign, logOut }}>
          {this.props.children}
        </AuthContexts.Provider>
      </>
    );
  }
}

export default AuthContexts;
