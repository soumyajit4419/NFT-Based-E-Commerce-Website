import React, { Component } from "react";
// import axios from 'axios';
import api from "../../utils/api/index";
import verified from "../../verified.png";

// const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json/seller";

const data = {
  preHeading: "RECENTLY ADDED",
  heading: "New Artists",
};

class TopSeller extends Component {
  state = {
    data: {},
    sellerData: [],
  };
  componentDidMount() {
    // axios.get(`${BASE_URL}`)
    //     .then(res => {
    //         this.setState({
    //             data: res.data,
    //             // sellerData: res.data.sellerData
    //         })
    //         // console.log(this.state.data)
    //     })
    // .catch(err => console.log(err))

    api.getTopUsersApi().then((res) => {
      console.log(res.data, "topusers");
      this.setState({
        data: data,
        sellerData: res.data.topUsers,
      });
      // console.log(res)
    });
  }
  render() {
    return (
      <section className="top-seller-area p-5" style={{ marginTop: "150px" }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro m-0 d-flex justify-content-between">
                <div className="intro-content">
                  <span>{this.state.data.preHeading}</span>
                  <h3 className="mt-3 mb-0">{this.state.data.heading}</h3>
                </div>
                <div className="intro-btn">
                  <a className="btn content-btn" href="/artists">
                    View All
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row items">
            {this.state.sellerData.map((item, idx) => {
              return (
                <div
                  key={`ts_${idx}`}
                  className="col-12 col-sm-6 col-lg-4 item"
                >
                  {/* Single Seller */}
                  <div className="card no-hover">
                    <div className="single-seller d-flex align-items-center">
                      <a href={`/artist/${item.wallet_address}`}>
                        <img
                          className="avatar-md rounded-circle"
                          src={
                            item.profile_image
                              ? item.profile_image !== ""
                                ? item.profile_image
                                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          }
                          alt=""
                        />
                      </a>
                      {/* Seller Info */}
                      <div className="seller-info ml-3">
                        <div className="d-flex">
                          <div>{"@" + item.profile_name}</div>
                          {item.is_verified ? (
                            <div>
                              <img
                                src={verified}
                                alt="no"
                                style={{
                                  width: "15px",
                                  height: "15px",
                                  marginLeft: "10px",
                                }}
                              />
                            </div>
                          ) : (
                            "hello"
                          )}
                        </div>
                        <a
                          className="seller mb-2"
                          href={`/artist/${item.wallet_address}`}
                        >
                          {item.wallet_address.slice(0, 6)}...
                        </a>
                        <span>{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default TopSeller;
