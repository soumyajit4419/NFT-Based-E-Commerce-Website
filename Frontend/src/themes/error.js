import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ModalMenu from "../components/Modal/ModalMenu";

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
      <ModalMenu />
    </div>
  );
}
