import React from "react";
import Header from "../components/Header/Header";
import SaleProducts from "../components/Sale_Products/Sale_Products";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

const SaleProduct = (props) => {
  return (
    <div className="main">
      <Header />
      <SaleProducts />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default SaleProduct;
