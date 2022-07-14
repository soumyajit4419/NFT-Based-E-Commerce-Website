import React, { Component } from "react";

import Header from "../components/Header/Header";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";
import Signup from "../components/Signup/Signup";

class SignupTheme extends Component {
  render() {
    return (
      <div className="main">
        <Header />
        <Signup/>
        <ModalSearch />
        <ModalMenu />
        <Scrollup />
      </div>
    );
  }
}

export default SignupTheme;
