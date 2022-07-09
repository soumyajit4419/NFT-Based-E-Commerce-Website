import React, { Component, lazy, Suspense } from "react";

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Auctions from "../components/Auctions/AuctionsOne";
import TopSeller from "../components/TopSeller/TopSellerOne";
import Collections from "../components/Collections/Collections";
import Explore from "../components/Explore/ExploreOne";
import Work from "../components/Work/Work";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

import api from "../utils/api/index";

// function ThemeOne(){
//     return(
//         <div className="main">
//             <Header />
//             <Hero />
//             <Auctions />
//             <TopSeller />
//             <Collections />
//             <Suspense fallback={<div style={{ color: "white" }}>Loading</div>}>
//                 <Explore />
//             </Suspense>

//             <Work />
//             <Footer />
//             <ModalSearch />
//             <ModalMenu />
//             <Scrollup />
//         </div>

//     )
// }

class ThemeOne extends Component {
  state = {
    nfts: [],
  };
  componentDidMount() {
    api.homePageApi().then((res) => {
      this.setState({
        nfts: res.data.newNft,
      });
    });
  }
  render() {
    return (
      <div className="main">
        <Header />
        <Hero />
        <Work />
        <Explore nfts={this.state.nfts} />
        <Auctions />
        <TopSeller />
        <Collections />

        <Footer />
        <ModalSearch />
        <ModalMenu />
        <Scrollup />
      </div>
    );
  }
}

export default ThemeOne;
