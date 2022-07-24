import React, { Component } from "react";

class Work extends Component {
  state = {
    data: {
      preHeading: "How It Works",
      heading: "Create and sell your NFTs",
    },
    workData: [
      {
        id: 1,
        icon: "icons icon-wallet text-effect",
        title: "Set up your wallet",
        text: "Once you’ve set up your wallet of choice, connect it to Loud Market by clicking the Wallet Connect in the top right corner. Learn about the wallets we support.",
      },
      {
        id: 2,
        icon: "icons icon-grid text-effect",
        title: "Create your collection",
        text: "Click create and set up your collection. Add social links, a description, profile & banner images.",
      },
      {
        id: 3,
        icon: "icons icon-drawer text-effect",
        title: "Add your NFTs",
        text: "Upload your work (image and audio MP3), add a title and description. Then choose the sale and/or auction starting price and a 'Royalty Fee' for all future sales.",
      },
      {
        id: 4,
        icon: "icons icon-bag text-effect",
        title: "List them for sale",
        text: "Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs!",
      },
    ],
  };
  componentDidMount() {}

  render() {
    return (
      <section className="work-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro mb-4">
                <div className="intro-content">
                  <span>{this.state.data.preHeading}</span>
                  <h3 className="mt-3 mb-0">{this.state.data.heading}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row items">
            {this.state.workData.map((item, idx) => {
              return (
                <div
                  key={`wd_${idx}`}
                  className="col-12 col-sm-6 col-lg-3 item"
                >
                  {/* Single Work */}
                  <div className="single-work">
                    <i className={item.icon} />
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
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

export default Work;
