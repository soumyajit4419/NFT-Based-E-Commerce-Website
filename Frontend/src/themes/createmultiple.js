import React from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Creates from "../components/Create/Create";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";
import CreateMultiple from "../components/CreateMultiple/CreateMultiple";
export default function createmultiple() {
  return (
    <div className="main">
      <Header />
      {/* <Breadcrumb title="Create" subpage="Pages" page="Create" /> */}
      <CreateMultiple />
      <Footer />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
}
