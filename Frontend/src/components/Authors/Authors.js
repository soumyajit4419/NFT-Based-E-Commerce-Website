import React, { Component } from "react";
import axios from "axios";
import verified from "../../verified.png";

const BASE_URL = "https://loud-backend.herokuapp.com/get_more_users";

class Authors extends Component {
  state = {
    data: {},
    authorData: [],
  };
  componentDidMount() {
    axios
      .get(`${BASE_URL}`)
      .then((res) => {
        this.setState({
          data: res.data,
          authorData: res.data.topUsers,
        });
        // console.log(this.state.data)
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <section className="popular-collections-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              {/* Intro */}
              <div className="intro text-center">
                <span>{"Creators"}</span>
                <h3 className="mt-3 mb-0">{"Our Artists"}</h3>
                <p>{this.state.data.content}</p>
              </div>
            </div>
          </div>
          <div className="row items">
            {this.state.authorData &&
              this.state.authorData.map((item, idx) => {
                return item.is_verified ? (
                  <div
                    key={`ad_${idx}`}
                    className="col-12 col-sm-6 col-lg-3 item"
                  >
                    <div className="card no-hover text-center">
                      <div className="image-over">
                        <a href={`/artist/${item.wallet_address}`}>
                          <img
                            className="card-img-top"
                            src={
                              item.profile_image !== ""
                                ? item.profile_image
                                : "data:image/jpeg;base64,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"
                            }
                            alt=""
                          />
                        </a>
                      </div>
                      {/* Card Caption */}
                      <div className="card-caption col-12 p-0">
                        {/* Card Body */}
                        <div className="card-body mt-4 ">
                          <div>{"@" + item.profile_name}</div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <a href={`/artist/${item.wallet_address}`}>
                              <h5>{item.wallet_address.slice(0, 6) + "..."}</h5>
                            </a>
                            <div>
                              {item.is_verified ? (
                                <div>
                                  <img
                                    src={verified}
                                    alt="no"
                                    style={{ width: "15px", height: "15px" }}
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>

                          <a
                            className="btn btn-bordered-white btn-smaller"
                            href={`/artist/${item.wallet_address}`}
                          >
                            {"View Profile"}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                );
              })}
          </div>
        </div>
      </section>
    );
  }
}

export default Authors;
