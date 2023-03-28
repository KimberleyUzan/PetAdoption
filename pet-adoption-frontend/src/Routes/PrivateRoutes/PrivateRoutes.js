import React, { Component } from "react";
import NavigateComponents from "./NavigateComponent";
class PrivateRoutes extends Component {
  state = {
    userInfo: "",
  };
  render() {
    const getItem = localStorage.getItem("userEmail");
    // const getItemFormLogin = localStorage.getItem("userEmail");
    // const parseItemFormLogin = JSON.parse(getItemFormLogin);
    const parseItem = JSON.parse(getItem);
    if (parseItem) {
      console.log("email done");
      return this.props.children;
    } else {
      return <NavigateComponents></NavigateComponents>;
    }
  }
}

export default PrivateRoutes;
