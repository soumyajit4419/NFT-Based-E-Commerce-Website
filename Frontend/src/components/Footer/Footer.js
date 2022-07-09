import React, { Component } from "react";
import axios from "axios";
import logo from "../../logo.png";
import api from "../../utils/api/index";
import footerlogo from "../../footerlogo.png";

const BASE_URL =
  "https://my-json-server.typicode.com/themeland/netstorm-json-2/footer";

class Footer extends Component {
  state = {
    data: {},
    socialData: [],
    widgetData_1: [],
    widgetData_2: [],
    emailInput: "",
    loading: false,
    isVerified: false,
  };
  componentDidMount() {
    axios
      .get(`${BASE_URL}`)
      .then((res) => {
        this.setState({
          data: res.data,
          socialData: res.data.socialData,
          widgetData_1: res.data.widgetData_1,
          widgetData_2: res.data.widgetData_2,
        });
        // console.log(this.state.data)
      })
      .catch((err) => console.log(err));

    axios({
      method: "POST",
      url: "https://loud-backend.herokuapp.com/get_user_details",
      data: {
        user: localStorage.getItem("wallet"),
      },
    })
      .then((res) => {
        if (res.data.is_verified) {
          console.log(res, "dsds");
          this.setState({ isVerified: true });
        } else {
          console.log("not artist");
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  emailOnChangeHandler = (e) => {
    this.setState({ emailInput: e.target.value });
  };

  sendEmailHandler = () => {
    if (
      this.state.emailInput === undefined ||
      this.state.emailInput === null ||
      this.state.emailInput === ""
    ) {
      alert("Please enter a valid email address");
      return;
    }
    this.setState({ loading: true });
    const data = {
      email: this.state.emailInput,
      name: "nil",
      subject: "nil",
      message: "nil",
    };
    api
      .sendEmailApi(data)
      .then((res) => {
        this.setState({ emailInput: "" });
        console.log(res);
        alert("Subscribed successfully!");
        this.setState({ loading: false });
      })
      .catch((err) => {
        //alert("");
        this.setState({ loading: false });
      });
    // console.log(data);
  };

  render() {
    return (
      <footer className="footer-area">
        {/* Footer Top */}
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-3 res-margin">
                {/* Footer Items */}
                <div className="footer-items">
                  {/* Logo */}
                  <a className="navbar-brand" href="/">
                    <img
                      src="https://i.imgur.com/SwNV2RQ.png"
                      alt=""
                      style={{ width: "100px" }}
                    />
                  </a>
                  <p>
                    Loud Market Ltd <br /> 160 Kemp House <br /> City Road{" "}
                    <br /> London <br /> EC1v 2NX
                  </p>
                  {/* Social Icons */}
                  <div className="social-icons d-flex">
                    {/* {this.state.socialData.map((item, idx) => {
                      return (
                        <a key={`sd_${idx}`} className={item.link} href="#">
                          <i className={item.icon} />
                          <i className={item.icon} />
                        </a>
                      );
                    })} */}

                    <a
                      className={"twitter"}
                      href=" https://twitter.com/LoudMarketNFTs "
                      target="_blank"
                    >
                      <i className={"fab fa-twitter"} />
                      <i className={"fab fa-twitter"} />
                    </a>
                    <a
                      className={"facebook"}
                      href="https://facebook.com/LoudMarketNFTs"
                    >
                      <i className={"fab fa-facebook-f"} />
                      <i className={"fab fa-facebook-f"} />
                    </a>
                    <a className={"telegram"} href="https://t.me/LoudMarket">
                      <i className={"fab fa-telegram"} />
                      <i className={"fab fa-telegram"} />
                    </a>
                    <a
                      className={"instagram"}
                      href="https://www.instagram.com/loudmarketnfts/"
                    >
                      <i className={"fab fa-instagram"} />
                      <i className={"fab fa-instagram"} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 res-margin">
                {/* Footer Items */}
                <div className="footer-items">
                  {/* Footer Title */}
                  <h4 className="footer-title">{this.state.data.widget_1}</h4>
                  <ul>
                    <li>
                      <a href="/featured">{"All Nfts"}</a>
                    </li>
                    {/* <li>
                      <a href="/how-it-works">{"How It Works"}</a>
                    </li> */}
                    {this.state.isVerified && localStorage.getItem("wallet") && (
                      <li>
                        <a href="/create">{"Create"}</a>
                      </li>
                    )}
                    {/* <li x>
                      <a href="/privacy-terms">{"Privacy and Terms"}</a>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 res-margin">
                {/* Footer Items */}
                <div className="footer-items">
                  {/* Footer Title */}
                  <h4 className="footer-title">{this.state.data.widget_2}</h4>
                  <ul>
                    <li>
                      <a href="/help-center">Help Center</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                {/* Footer Items */}
                <div className="footer-items">
                  {/* Footer Title */}
                  <h4 className="footer-title">{this.state.data.widget_3}</h4>
                  {/* Subscribe Form */}
                  <div className="subscribe-form d-flex align-items-center">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="info@yourmail.com"
                      onChange={this.emailOnChangeHandler}
                    />

                    <button
                      type="submit"
                      className="btn"
                      onClick={this.sendEmailHandler}
                    >
                      {this.state.loading ? (
                        <i class="fas fa-spinner fa-spin"></i>
                      ) : (
                        <i className="icon-paper-plane" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Copyright Area */}
                <div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                  {/* Copyright Left */}
                  <div className="copyright-left">
                    ©2021 LOUD, All Rights Reserved.
                  </div>
                  {/* Copyright Right */}
                  <div className="copyright-right">
                    Made with <i className="fas fa-heart" /> By{" "}
                    <a href="/">LOUD Team</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
