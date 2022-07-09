import React, { Component } from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import ItemDetail from "../components/ItemDetails/ItemDetails";
import LiveAuctions from "../components/Auctions/AuctionsThree";
import Footer from "../components/Footer/Footer";
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
        {/* <LiveAuctions /> */}
        <Footer />
        <ModalSearch />
        <ModalMenu />
        <Scrollup />
      </div>
    );
  }
}

export default collectibleDetails;
