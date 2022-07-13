import React from "react";

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import Work from "../components/Work/Work";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

const ThemeOne = () => {
  return (
    <div className="main">
      <Header />
      <Hero />
      <Categories />
      <Work />
      <br/><br/><br/>
      {/* <Collections /> */}
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default ThemeOne;
