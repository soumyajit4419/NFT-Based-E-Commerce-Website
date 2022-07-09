import React, { Component } from "react";
import axios from "axios";
import verified from "../../verified.png";
const BASE_URL =
  "https://my-json-server.typicode.com/themeland/netstorm-json-1/author";

class AuthorProfile extends Component {
  state = {
    data: {},
    socialData: [],
  };
  componentDidMount() {
    axios
      .get(`${BASE_URL}`)
      .then((res) => {
        this.setState({
          data: res.data,
          socialData: res.data.socialData,
          loading: true,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="card no-hover text-center">
        <div className="image-over">
          <img
            className="card-img-top"
            src={this.props.data.profile_image}
            alt=""
          />
          {/* Author */}
          <div className="author">
            <div className="author-thumb avatar-lg">
              <img
                className="rounded-circle"
                src={this.props.data.profile_image}
                alt=""
              />
            </div>
          </div>
        </div>
        {/* Card Caption */}
        <div className="card-caption col-12 p-0">
          {/* Card Body */}
          <div className="card-body mt-4">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h5 className="mb-3">
                {this.props.data.profile_name === ""
                  ? this.props.data.wallet_address
                    ? this.props.data.wallet_address.slice(0, 20) + "..."
                    : ""
                  : this.props.data.profile_name}
              </h5>
              {this.props.data.is_verified ? (
                <img
                  src={verified}
                  alt="no"
                  style={{
                    width: "15px",
                    height: "15px",
                    marginTop: "-15px",
                    marginLeft: "10px",
                  }}
                />
              ) : (
                ""
              )}
            </div>
            <p className="my-3">{this.props.data.bio}</p>
            <div
              className="input-group"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <center>
                <div>
                  {this.props.data.wallet_address
                    ? this.props.data.wallet_address.slice(0, 20) + "..."
                    : ""}
                </div>
              </center>

              {/* <input
                type="text"
                className="form-control"
                placeholder={this.props.data.wallet_address}
              /> */}
              {/* <div className="input-group-append">
                <button>
                  <i className="icon-docs" />
                </button>
              </div> */}
            </div>
            {/* Social Icons */}
            <div className="social-icons d-flex justify-content-center my-3">
              {/* {this.state.socialData.map((item, idx) => {
                return (
                  <a key={`asd_${idx}`} className={item.link} href={}>
                    <i className={item.icon} />
                    <i className={item.icon} />
                  </a>
                );
              })} */}
              {this.props.data.facebook ? (
                <a
                  className={"facebook"}
                  href={this.props.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={"fab fa-facebook-f"} />
                  <i className={"fab fa-facebook-f"} />
                </a>
              ) : (
                ""
              )}
              {this.props.data.instagram ? (
                <a className={"instagram"} href={this.props.data.instagram}>
                  <i className={"fab fa-instagram"} />
                  <i className={"fab fa-instagram"} />
                </a>
              ) : (
                ""
              )}
              {this.props.data.twitter ? (
                <a className={"twitter"} href={this.props.data.twitter}>
                  <i className={"fab fa-twitter"} />
                  <i className={"fab fa-twitter"} />
                </a>
              ) : (
                ""
              )}
              {this.props.data.telegram ? (
                <a className={"telegram"} href={this.props.data.telegram}>
                  <i className={"fab fa-telegram"} />
                  <i className={"fab fa-telegram"} />
                </a>
              ) : (
                ""
              )}
            </div>
            {/* <a className="btn btn-bordered-white btn-smaller" href="/">
              {this.state.data.btnText}
            </a> */}
          </div>
        </div>
        {this.props.data.wallet_address === localStorage.getItem("wallet") ? (
          <a
            style={{ cursor: "pointer" }}
            href={`/artist/${this.props.data.wallet_address}/edit-profile`}
          >
            Edit Profile
          </a>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default AuthorProfile;
