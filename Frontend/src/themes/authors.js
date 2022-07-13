import React, { Component } from "react";

import Header from "../components/Header/Header";
import Author from "../components/Authors/Authors";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

class Authors extends Component {
  render() {
    return (
      <div className="main">
        <Header />
        {/* <Breadcrumb title="Authors" subpage="Pages" page="Authors" /> */}
        <Author />
        {/* <TopSeller /> */}
        <Footer />
        <ModalSearch />
        <ModalMenu />
        <Scrollup />
      </div>
    );
  }
}

export default Authors;
