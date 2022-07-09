import React, { Component } from "react";
import api from "../../utils/api/index";

const initData = {
  pre_heading: "Auctions",
  heading: "Live Auctions",
  content:
    "",
  btnText: "Load More",
};

const data = [
  {
    id: "1",
    img: "/img/auction_1.jpg",
    date: "2021-12-09",
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
    title: "Magazine Fall",
    seller_thumb: "/img/avatar_5.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "6",
    img: "/img/auction_6.jpg",
    date: "2022-03-30",
    title: "Inspiration",
    seller_thumb: "/img/avatar_6.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "7",
    img: "/img/auction_7.jpg",
    date: "2022-01-24",
    title: "Design Illusions",
    seller_thumb: "/img/avatar_7.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "8",
    img: "/img/auction_8.jpg",
    date: "2022-03-30",
    title: "Design Illusions",
    seller_thumb: "/img/avatar_8.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "9",
    img: "/img/auction_9.jpg",
    date: "2022-03-30",
    title: "Design Illusions",
    seller_thumb: "/img/avatar_4.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "10",
    img: "/img/auction_10.jpg",
    date: "2022-03-30",
    title: "Infinity",
    seller_thumb: "/img/avatar_1.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "11",
    img: "/img/auction_11.jpg",
    date: "2022-01-24",
    title: "Sports",
    seller_thumb: "/img/avatar_2.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "12",
    img: "/img/auction_12.jpg",
    date: "2022-03-30",
    title: "Characteristics",
    seller_thumb: "/img/avatar_3.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
];

class AuctionsTwo extends Component {
  state = {
    initData: {},
    data: [],
    loading: true,
  };
  componentDidMount() {
    api.getMoreAuctionsApi().then((res) => {
      this.setState({
        data: res.data.auctions,
        initData: initData,
        loading: false,
      });
    });
  }
  render() {
    return !this.state.loading ? (
      <section className="live-auctions-area load-more">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              {/* Intro */}
              <div className="intro text-center">
                <span>{this.state.initData.pre_heading}</span>
                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                <p>{this.state.initData.content}</p>
              </div>
            </div>
          </div>

          <div className="row items">
            {this.state.data.map((item, idx) => {
              let date = new Date(item.auction_end_time * 1000)
                .toISOString()
                .substr(0, 10);

              return (
                <div
                  key={`auct_${idx}`}
                  className="col-12 col-sm-6 col-lg-3 item"
                >
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
                      {/* Card Body */}
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
                          href="/author"
                        >
                          <img
                            className="avatar-sm rounded-circle"
                            src={
                              item.creator_image === ""
                                ? "data:image/jpeg;base64,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"
                                : item.creator_image
                            }
                            alt=""
                          />
                          {/* <span className="ml-2">{item.created_by.slice(0,6)}...</span> */}
                        </a>
                        <div className="card-bottom d-flex justify-content-between">
                          <span>{item.initial_price} LOUD</span>
                          <span>{item.count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className="row">
            <div className="col-12 text-center">
              <a id="load-btn" className="btn btn-bordered-white mt-5" href="#">
                {this.state.initData.btnText}
              </a>
            </div>
          </div> */}
        </div>
      </section>
    ) : (
      <div style={{ height: "600px" }}>
        <center style={{ marginTop: "200px" }}>
          <div class="fa-3x">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
        </center>
      </div>
    );
  }
}

export default AuctionsTwo;
