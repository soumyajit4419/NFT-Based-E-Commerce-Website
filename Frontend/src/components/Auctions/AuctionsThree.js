import React, { Component } from "react";
import api from "../../utils/api/index";
import axios from "axios";

const initData = {
  pre_heading: "Auctions",
  heading: "Live Auctions",
  btnText: "View All",
};

const data = [
  {
    id: "1",
    img: "/img/auction_1.jpg",
    date: "09/11/2022",
    title: "Virtual Worlds",
    seller_thumb: "/img/avatar_1.jpg",
    seller: "@Richard",
    price: "1.5 BNB",
    count: "1 of 1",
  },
  {
    id: "2",
    img: "/img/auction_2.jpg",
    date: "2021-10-05",
    title: "Collectibles",
    seller_thumb: "/img/avatar_2.jpg",
    seller: "@JohnDeo",
    price: "2.7 BNB",
    count: "1 of 1",
  },
  {
    id: "3",
    img: "/img/auction_3.jpg",
    date: "2021-09-15",
    title: "Arts",
    seller_thumb: "/img/avatar_3.jpg",
    seller: "@MKHblots",
    price: "2.3 BNB",
    count: "1 of 1",
  },
  {
    id: "4",
    img: "/img/auction_4.jpg",
    date: "2021-12-29",
    title: "Robotic Arts",
    seller_thumb: "/img/avatar_4.jpg",
    seller: "@RioArham",
    price: "1.8 BNB",
    count: "1 of 1",
  },
  {
    id: "5",
    img: "/img/auction_5.jpg",
    date: "2022-01-24",
    title: "Design Illusions",
    seller_thumb: "/img/avatar_5.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "6",
    img: "/img/auction_6.jpg",
    date: "2022-03-30",
    title: "Photography",
    seller_thumb: "/img/avatar_6.jpg",
    seller: "@Junaid",
    price: "3.5 BNB",
    count: "1 of 1",
  },
];

class AuctionsThree extends Component {
  state = {
    initData: {},
    data: [],
    loading: true,
  };
  componentDidMount() {
    // this.setState({
    //     data: data,
    //     initData: initData
    // })

    api.homePageApi().then((res) => {
      this.setState({
        data: res.data.topAuction,
        initData: initData,
        loading: false,
      });
    });
  }

  render() {
    if (!this.state.loading) {
      return (
        <section className="live-auctions-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Intro */}
                <div className="intro d-flex justify-content-between align-items-end m-0">
                  <div className="intro-content">
                    <span>{this.state.initData.pre_heading}</span>
                    <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                  </div>
                  <div className="intro-btn">
                    <a className="btn content-btn" href="/auctions">
                      {this.state.initData.btnText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="auctions-slides">
              <div className="swiper-container slider-mid items">
                <div className="swiper-wrapper">
                  {/* Single Slide */}
                  {this.state.data.map((item, idx) => {
                    let date = new Date(item.auction_end_time * 1000)
                      .toISOString()
                      .substr(0, 10);
                    return (
                      <div key={`auc_${idx}`} className="swiper-slide item">
                        <div className="card">
                          <div className="image-over">
                            <a href="/item-details">
                              <img
                                className="card-img-top"
                                src={item.cover_image}
                                alt=""
                              />
                            </a>
                          </div>
                          {/* Card Caption */}
                          <div className="card-caption col-12 p-0">
                            {/* Card Body console.log(new Date(item.auction_end_time * 1000)) */}
                            <div className="card-body">
                              <div className="countdown-times mb-3">
                                <div
                                  className="countdown d-flex justify-content-center"
                                  data-date={date}
                                />
                              </div>
                              <a href="/item-details">
                                <h5 className="mb-0">{item.name}</h5>
                              </a>
                              <a
                                className="seller d-flex align-items-center my-3"
                                href="/item-details"
                              >
                                <img
                                  className="avatar-sm rounded-circle"
                                  src={item.creator_image}
                                  alt=""
                                />
                                <span className="ml-2">
                                  {item.owned_by.slice(0, 6)}...
                                </span>
                              </a>
                              <div className="card-bottom d-flex justify-content-between">
                                <span>{item.initial_price} BNB</span>
                                <span>{item.count}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="swiper-pagination" />
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default AuctionsThree;
