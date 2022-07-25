import React, { Component } from "react";
// import sample from "../../bgvideo.mov";
import axios from "axios";

const initData = {
  pre_heading: "Welcome to Flipkart",
  heading: "Buy any Product and get Warranty attached NFTs",
  content: "The World's First Product Warranty NFT Marketplace",
  btn_1: "Explore",
  btn_2: "More"
};

class Hero extends Component {
  state = {
    data: initData,
  };

  render() {
    return (
      <section className="hero-section">
        <div className="container" style={{ marginTop: "100px" }}>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-7">
              <span>{this.state.data.pre_heading}</span>
              <h1 className="mt-4">{this.state.data.heading}</h1>
              <p>{this.state.data.content}</p>
              {/* Buttons */}
              <div className="button-group">
                {localStorage.getItem("wallet") && this.state.isVerified && (
                  <a className="btn btn-bordered-white" href="/create">
                    <i className="icon-note mr-2" />
                    {this.state.data.btn_2}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Shape */}
        <div className="shape">
        
        </div>{" "}
      </section>
    );
  }
}

export default Hero;
