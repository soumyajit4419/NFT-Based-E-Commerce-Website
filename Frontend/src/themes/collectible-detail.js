import React, { Component } from "react";
import Header from "../components/Header/Header";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";
import CollectibleDetail from "../components/CollectibleDetails/CollectibleDetail";

class collectibleDetails extends Component {
  render() {
    return (
      <div className="main">
        <Header />
        <CollectibleDetail />
        <ModalSearch />
        <ModalMenu />
        <Scrollup />
      </div>
    );
  }
}

export default collectibleDetails;
