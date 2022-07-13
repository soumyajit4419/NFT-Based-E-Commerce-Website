import React, { Component } from "react";

import Header from "../components/Header/Header";
import Wallet from "../components/Wallet/Wallet";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

class WalletConnect extends Component {
  render() {
    return (
      <div className="main">
        <Header />
        <Wallet />
        <Footer />
        <ModalSearch />
        <ModalMenu />
        <Scrollup />
      </div>
    );
  }
}

export default WalletConnect;
