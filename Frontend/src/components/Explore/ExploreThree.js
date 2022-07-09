import React, { Component, useState, useEffect } from "react";
import axios from "axios";

const initData = {
  pre_heading: "Explore",
  heading: "Exclusive Digital Assets",
  content:
    "",
  filter_1: "All",
  filter_2: "Art",
  filter_3: "Music",
  filter_4: "Collectibles",
  filter_5: "Sports",
};

const data = [
  {
    id: "1",
    img: "/img/auction_1.jpg",
    group: '["art","sports"]',
    title: "Walking On Air",
    owner: "Richard",
    price: "1.5 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "2",
    img: "/img/auction_2.jpg",
    group: '["collectibles","sports"]',
    title: "Domain Names",
    owner: "John Deo",
    price: "2.7 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "3",
    img: "/img/auction_3.jpg",
    group: '["art","music"]',
    title: "Trading Cards",
    owner: "Arham",
    price: "2.3 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "4",
    img: "/img/auction_4.jpg",
    group: '["sports","art","music"]',
    title: "Industrial Revolution",
    owner: "Yasmin",
    price: "1.8 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "5",
    img: "/img/auction_5.jpg",
    group: '["music","sports","collectibles"]',
    title: "Utility",
    owner: "Junaid",
    price: "1.7 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "6",
    img: "/img/auction_6.jpg",
    group: '["collectibles","sports"]',
    title: "Sports",
    owner: "ArtNox",
    price: "1.9 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "7",
    img: "/img/auction_7.jpg",
    group: '["art","sports"]',
    title: "Cartoon Heroes",
    owner: "Junaid",
    price: "3.2 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "8",
    img: "/img/auction_8.jpg",
    group: '["music","sports","art","collectibles"]',
    title: "Gaming Chair",
    owner: "Johnson",
    price: "0.69 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "9",
    img: "/img/auction_9.jpg",
    group: '["music","sports","collectibles"]',
    title: "Photography",
    owner: "Sara",
    price: "2.3 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "10",
    img: "/img/auction_10.jpg",
    group: '["art","music"]',
    title: "Zed Run",
    owner: "SpaceMan",
    price: "3.7 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "11",
    img: "/img/auction_11.jpg",
    group: '["sports","art","music"]',
    title: "Rare Tyres",
    owner: "Monas",
    price: "2.2 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "12",
    img: "/img/auction_12.jpg",
    group: '["music","sports","collectibles"]',
    title: "World of Women",
    owner: "Victor",
    price: "4.3 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
];

export default function ExploreThree() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://loud-backend.herokuapp.com/get_more_collectibles",
    })
      .then((res) => {
        setData(res.data.collectibles);
        setLoading(false);
      })
      .catch((e) => setData(e));
  }, []);
  return (
    <div>
      {loading ? (
        <div style={{ height: "80vh" }}>
          <center>
            <div class="fa-3x mt-5 pt-5">
              <i class="fas fa-spinner fa-spin"></i>
            </div>
          </center>
        </div>
      ) : (
        <section className="explore-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-7">
                {/* Intro */}
                <div className="intro text-center mb-4">
                  <span>{initData.pre_heading}</span>
                  <h3 className="mt-3 mb-0">{initData.heading}</h3>
                  {/* <p>{initData.content}</p> */}
                </div>
              </div>
            </div>

            <div className="row items explore-items">
              {data.map((item, idx) => {
                return (
                  <div
                    key={`edth_${idx}`}
                    className="col-12 col-sm-6 col-lg-3 item explore-item"
                  >
                    <div className="card" style={{height:"100%"}}>
                      <div>
                        <a href={`/collectibles/${item.token_id}`}>
                          <img
                            className="card-img-top"
                            src={
                              item.cover_image === ""
                                ? "https://www.thegreatapps.com/application/upload/Apps/2019/03/free-music-player-online-offline-mp3-player-16.png"
                                : item.cover_image
                            }
                            alt=""
                          />
                        </a>
                      </div>
                      {/* Card Caption */}
                      <div className="card-caption col-12 p-0">
                        {/* Card Body */}
                        <div className="card-body">
                          <a href={`/collectibles/${item.token_id}`}>
                            <h5 className="mb-0">{item.name}</h5>
                          </a>
                          <div className="seller d-flex align-items-center my-3">
                            <span>Owned By</span>
                            <a href={`/artist/${item.owned_by}`}>
                              <h6 className="ml-2 mb-0">
                                {item.owned_by.slice(0, 6) + "..."}
                              </h6>
                            </a>
                          </div>
                          <div className="card-bottom d-flex justify-content-between">
                            <span>{item.item_price + "LOUD"}</span>
                            <span>Quantity: {item.quantity}</span>
                          </div>
                          {item.on_sale ? (
                            <a
                              className="btn btn-bordered-white btn-smaller mt-3"
                              href={`/collectibles/${item.token_id}`}
                            >
                              <i className="icon-handbag mr-2" />
                              {"Buy Now"}
                            </a>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
