import React from "react";
import Header from "../components/Header/Header";
import Categories from "../components/Categories/Categories";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

const Dashboard = () => {
  return (
    <div className="main">
      <Header />
      <Categories />
      <br/><br/><br/>
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default Dashboard;
