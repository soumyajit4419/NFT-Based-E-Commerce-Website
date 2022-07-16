import React from "react";

import Header from "../components/Header/Header";
import Card from "../components/Payment/Card";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

const AllProduct = (props) => {
  return (
    <div className="main">
      <Header />
      <Card />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default AllProduct;
