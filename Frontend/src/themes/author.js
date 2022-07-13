import React, { Component } from "react";

import Header from "../components/Header/Header";
import AuthorProfile from "../components/Author/Author";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

import { withRouter } from "react-router";
import api from "../utils/api/index";

class Author extends Component {
  // state = {
  //   data: {},
  //   nfts: [],
  // };
  // componentDidMount() {
  //   const wallet_address = this.props.match.params.wallet_address;
  //   api.getTopSpecificUsersApi({ user: `${wallet_address}` }).then((res) => {
  //     this.setState({
  //       data: res.data,
  //       nfts: res.data.nfts,
  //     });
  //     // console.log(res.data)
  //     // console.log(this.state.data)
  //   });
  //   // console.log(this.state.data)
  // }

  state = {
    data: {},
    nfts: [],
    activity: [],
    collectibles: [],
    loading: false,
  };
  componentDidMount() {
    const wallet_address = this.props.match.params.wallet_address;
    api.getTopSpecificUsersApi({ user: `${wallet_address}` }).then((res) => {
      console.log(res.data, "this is res");
      this.setState({
        data: res.data,
        nfts: res.data.nfts,
        activity: res.data.activity,
        collectibles: res.data.collectibles,
        loading: true,
      });
      // console.log(res.data)
      // console.log(this.state.data)
    });
    // console.log(this.state.data)
  }

  render() {
    return !this.state.loading ? (
      <div>
        <center>
          <div class="fa-3x">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
        </center>
      </div>
    ) : (
      <div className="main">
        <Header />
        {/* <Breadcrumb title="Author Profile" subpage="Pages" page="Author" /> */}
        <AuthorProfile
          data={this.state.data}
          nfts={this.state.nfts}
          activity={this.state.activity}
          collectibles={this.state.collectibles}
        />
        <Footer />
        <ModalSearch />
        <ModalMenu />
        <Scrollup />
      </div>
    );
  }
}

export default withRouter(Author);
