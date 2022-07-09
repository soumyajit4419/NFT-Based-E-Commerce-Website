import React, { Component } from "react";
import axios from "axios";

const BASE_URL =
  "https://my-json-server.typicode.com/themeland/netstorm-json-1/activity";

class Activity extends Component {
  state = {
    data: {},
    tabData_1: [],
    tabData_2: [],
    tabData_3: [],
    filterData: [],
  };
  componentDidMount() {
    axios
      .get("https://loud-backend.herokuapp.com/get_activities")
      .then((res) => {
        this.setState({
          data: res.data,
          tabData_1: res.data.tabData_1,
          tabData_2: res.data.tabData_2,
          tabData_3: res.data.tabData_3.reverse(),
          filterData: [],
        });
        // console.log(this.state.data)
      })
      .catch((err) => console.log(err));
    }

    //Sort by Date in Descending Order
    sortByDate(arrayOfObjs) {
        arrayOfObjs.sort(function (a, b) {
            return Number(new Date(b.date)) - Number(new Date(a.date));
        });

        return arrayOfObjs;
    }

  render() {
    return (
      <section className="activity-area load-more">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro mb-4">
                <div className="intro-content">
                  <span>Creative</span>
                  <h3 className="mt-3 mb-0">Recent Activity</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row items">
            <div className="col-12 col-md-6 col-lg-8">
              {/* Netstorm Tab */}
              {/* <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
                <li>
                  <a
                    className="active"
                    id="nav-home-tab"
                    data-toggle="pill"
                    href="#nav-home"
                  >
                    <h5 className="m-0">All</h5>
                  </a>
                </li>
                <li>
                  <a
                    id="nav-profile-tab"
                    data-toggle="pill"
                    href="#nav-profile"
                  >
                    <h5 className="m-0">Recent</h5>
                  </a>
                </li>
                <li>
                  <a
                    id="nav-contact-tab"
                    data-toggle="pill"
                    href="#nav-contact"
                  >
                    <h5 className="m-0">Purchase</h5>
                  </a>
                </li>
              </ul> */}
              {/* Tab Content */}
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home">
                  <ul className="list-unstyled">
                    {/* Single Tab List */}
                    {console.log(this.state.tabData_1,"activity")}
                    {this.sortByDate(this.state.tabData_1).slice(0,20).map((item, idx) => {
                      console.log(item.url, item.by_name);
                      return (
                        <li
                          key={`ato_${idx}`}
                          className="single-tab-list d-flex align-items-center"
                        >
                          <a href={item.url ? item.url : "/featured"}>
                            <img
                              className="avatar-lg"
                              src={
                                item.type === "Buy"
                                  ? "https://image.freepik.com/free-vector/sold-out-price-tag-sign_123447-162.jpg"
                                  : item.type === "On Auction"
                                  ? "https://www.auctionindia.com/assets/images/auction.png"
                                  : item.type === "Bid"
                                  ? "https://image.flaticon.com/icons/png/512/1203/1203435.png"
                                  : item.type === "collectible transfer"? 
                                  "https://a.espncdn.com/i/espn/misc_logos/500-dark/transfers.png"
                                  : item.image
                              }
                              alt=""
                            />
                          </a>
                          {/* Activity Content */}
                          <div className="activity-content ml-4">
                            <a href={item.url ? item.url : "/featured"}>
                              <h5 className="mt-0 mb-2">{item.name}</h5>
                            </a>
                            <p className="m-0">
                              {item.type === "Buy" ? "Bought for " : item.type}{" "}
                              <strong>
                                {item.type === "Bid"
                                  ? item.amount
                                  : item.type === "Buy"
                                  ? item.url.split("/")[1] === "collectibles"
                                    ? item.amount / 1000000000000000000 +
                                      " LOUD "
                                    : item.amount + " LOUD "
                                  : ""}
                              </strong>
                              {item.time} <br />
                              by{" "}
                              <a href={`/artist/${item.by}`}>
                                @{item.by?.slice(0, 8) + "..."}
                              </a>
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="tab-pane fade" id="nav-profile">
                  <ul className="list-unstyled">
                    {/* Single Tab List */}
                     {this.sortByDate(this.state.tabData_2).map((item, idx) => {
                      return (
                        <li
                          key={`att_${idx}`}
                          className="single-tab-list d-flex align-items-center"
                        >
                          <a href={item.url ? item.url : "/featured"}>
                            <img
                              className="avatar-lg"
                              src={
                                item.type === "Buy"
                                  ? "https://image.freepik.com/free-vector/sold-out-price-tag-sign_123447-162.jpg"
                                  : item.type === "On Auction"
                                  ? "https://www.auctionindia.com/assets/images/auction.png"
                                  : item.type === "Bid"
                                  ? "https://thumbs.dreamstime.com/b/hand-paddle-bid-hand-paddle-bid-auction-bidding-concept-flat-style-business-bidding-process-vector-illustration-117292441.jpg"
                                  : item.image
                              }
                              alt=""
                            />
                          </a>
                          {/* Activity Content */}
                          <div className="activity-content ml-4">
                            <a href="/item-details">
                              <h5 className="mt-0 mb-2">{item.name}</h5>
                            </a>
                            <p className="m-0">
                              {item.type === "Buy"
                                ? "Bought "
                                : item.type + " "}
                              {" for "}
                              <strong>
                                {item.type === "Bid"
                                  ? item.amount
                                  : item.type === "Buy"
                                  ? item.url.split("/")[1] === "collectibles"
                                    ? item.amount / 1000000000000000000 +
                                      " BNB "
                                    : item.amount + " BNB "
                                  : ""}
                              </strong>
                              {""}
                              on {item.date?.slice(0, 10)} <br />
                              by{" "}
                              <a href={`/artist/${item.by}`}>
                                @{item.by?.slice(0, 8) + "..."}
                              </a>
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="tab-pane fade" id="nav-contact">
                  <ul className="list-unstyled">
                    {/* Single Tab List */}
                    {this.sortByDate(this.state.tabData_3).map((item, idx) => {
                      return (
                        <li
                          key={`atth_${idx}`}
                          className="single-tab-list d-flex align-items-center"
                        >
                          <a href={item.url}>
                            <img
                              className="avatar-lg"
                              src="https://image.freepik.com/free-vector/sold-out-price-tag-sign_123447-162.jpg"
                              alt=""
                            />
                          </a>
                          {/* Activity Content */}
                          <div className="activity-content ml-4">
                            <a href={`/`}>
                              <h5 className="mt-0 mb-2">{item.name}</h5>
                            </a>
                            <p className="m-0">
                              Bought for{" "}
                              <strong>
                                {item.url.split("/")[1] === "collectibles"
                                  ? item.amount / 1000000000000000000 + " BNB "
                                  : item.amount + " BNB "}
                              </strong>{" "}
                              {item.time} <br />
                              by{" "}
                              <a href={`/artist/${item.by}`}>
                                {item.by?.slice(0, 8) + "..."}
                              </a>
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Activity;
