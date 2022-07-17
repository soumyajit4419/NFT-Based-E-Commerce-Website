import React from "react";
import Header from "../components/Header/Header";
import Faq from "../components/Faq/Faq";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

const FAQ = () => {
  return (
    <div className="main">
      <Header />
      <Faq />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default FAQ;
