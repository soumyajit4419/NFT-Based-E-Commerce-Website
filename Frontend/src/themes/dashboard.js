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
      <LargeBanners />
      <CategorySlider category={"Watches"} />
      <Categories />
      <CategorySlider category={"Electronics"} />
      <Reference />
      <CategorySlider category={"Fitness"} />
      <CategorySlider category={"Mobiles"} />

      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default Dashboard;
