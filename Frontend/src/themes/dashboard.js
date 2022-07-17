import React from "react";
import Header from "../components/Header/Header";
import Categories from "../components/Categories/Categories";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";
import LargeBanners from "../components/Banners/LargeBanners";
import CategorySlider from "../components/Category/CategorySlider";
import Reference from "./reference";

const Dashboard = () => {
  return (
    <div className="main">
      <Header />
      <Categories />
      <LargeBanners />
      <CategorySlider />
      <Reference />
      <br />
      <br />
      <br />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default Dashboard;
