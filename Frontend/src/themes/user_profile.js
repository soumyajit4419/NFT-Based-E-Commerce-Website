import React from "react";
import Header from "../components/Header/Header";
import Userprofile from "../components/UserProfile/UserProfile";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

const Home = () => {
  return (
    <div className="main">
      <Header />
      <Userprofile/>
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default Home;
