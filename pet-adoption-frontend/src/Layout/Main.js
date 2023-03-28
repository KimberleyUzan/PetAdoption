import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../component/Shared/Header/Header";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Outlet></Outlet>

      </div>
    );
  }
}

export default Main;
