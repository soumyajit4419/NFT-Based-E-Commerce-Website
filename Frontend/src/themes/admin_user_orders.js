import React from "react";
import Header from "../components/Header/Header";
import AdminOrderContainer from "../components/Admin/admin_order_container";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

const Admin_Order_details = (props) => {
  return (
    <div className="main">
      <Header />
      <AdminOrderContainer />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default Admin_Order_details;
