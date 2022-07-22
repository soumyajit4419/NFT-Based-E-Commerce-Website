import React from "react";
import Header from "../components/Header/Header";
import OrderContainer from "../components/Orderdetails/OrderContainer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

const Order_details = (props) => {
  return (
    <div className="main">
      <Header />
      <OrderContainer />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default Order_details;
