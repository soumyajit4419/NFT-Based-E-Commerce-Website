import React from "react";
import Header from "../components/Header/Header";
import AllProducts from "../components/Products/All_Products";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

const AllProduct = (props) => {
  return (
    <div className="main">
      <Header />
      <AllProducts />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default AllProduct;
