import React from "react";
import Header from "../components/Header/Header";
import Order from "../components/Orderdetails/Orderdetails";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

const Order_details = (props) => {
  return (
    <div className="main">
      <Header />
      <Order />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default Order_details;
