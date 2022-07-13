import React from "react";
import Header from "../components/Header/Header";
import EachCategory from "../components/Categories/EachCategory";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

const Category = (props) => {
  return (
    <div className="main">
      <Header />
      <EachCategory category = {props.match.params.category}/>
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default Category;
