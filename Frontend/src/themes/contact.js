import React, { Component } from "react";

import Header from "../components/Header/Header";
import ContactSection from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

class Contact extends Component {
  render() {
    return (
      <div className="main">
        <Header />

        <ContactSection />
        <Footer />
        <ModalSearch />
        <ModalMenu />
        <Scrollup />
      </div>
    );
  }
}

export default Contact;
