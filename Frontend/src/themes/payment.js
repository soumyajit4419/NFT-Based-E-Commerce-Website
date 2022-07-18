import React from "react";

import Header from "../components/Header/Header";
import Payment from "../components/Payment/Card";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

const AllProduct = (props) => {
  return (
    <div className="main">
      <Header />
      <Payment productid={props.match.params.productid} />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default AllProduct;
