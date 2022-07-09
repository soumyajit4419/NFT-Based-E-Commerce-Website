import React, { Component } from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Faq from "../components/Faq/Faq";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";
import HowitWork from "../components/HowItWork/HowItWork";

class HowItWorks extends Component {
  render() {
    return (
      <div className="main">
        <Header />
        {/* <Breadcrumb
          title="Help Center"
          subpage="Community"
          page="Help Center"
        /> */}
        <HowitWork />
        <Faq />
        <Footer />
        <ModalSearch />
        <ModalMenu />
        <Scrollup />
      </div>
    );
  }
}

export default HowItWorks;
