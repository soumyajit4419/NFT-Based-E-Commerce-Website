import React from "react";

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Work from "../components/Work/Work";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";
import Faq from "../components/Faq/Faq";

const Home = () => {
  return (
    <div className="main">
      <Header />
      <Hero />
      <Work />
      <Faq />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default Home;
