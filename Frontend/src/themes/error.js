import React from "react";
import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Creates from "../components/Create/Create";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

export default function Error() {
  return (
    <div>
      <Header />
      {/* <Breadcrumb title="Create" subpage="Pages" page="Create" /> */}
      <div style={{ marginTop: "200px", height: "50vh" }}>
        <center>
          <h1>404</h1>
          <h2>Page you requested not Found!</h2>
        </center>
      </div>
      <Footer />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
}
