import React, { Component } from "react";

const initData = {
  pre_heading: "FAQ",
  heading: "Frequently Asked Questions",
  content: " ",
};

const data = [
  {
    id: "1",
    btnClass: "btn d-block text-left w-100 py-4",
    target: "#collapseOne",
    quote: "Any transaction fees?",
    contentId: "collapseOne",
    contentClass: "collapse show",
    content:
      "The only fees you will pay on Loud Market are gas fees! These tend to be under $0.05 per transaction! We don’t take a single penny from transactions on the Loud marketplace.",
  },
  {
    id: "2",
    btnClass: "btn d-block text-left w-100 collapsed py-4",
    target: "#collapseTwo",
    quote: "How can I buy Loud tokens?",
    contentId: "collapseTwo",
    contentClass: "collapse",
    content:
      "You will need a MetaMask/TrustWallet connected to the BSC. Then you can buy $LOUD on PancakeSwap using either BNB or BUSC.Click here to buy from PanCakeSwap - link https://pancakeswap.finance/swap?outputCurrency=0x3d0e22387ddfe75d1aea9d7108a4392922740b96",
  },
  {
    id: "3",
    btnClass: "btn d-block text-left w-100 collapsed py-4",
    target: "#collapseThree",
    quote: "How do Royalties work on Loud Market?",
    contentId: "collapseThree",
    contentClass: "collapse",
    content:
      "Artists can add a percentage “Royalty Fee” on their NFTs. When their NFTs are resold they will then receive that percentage of sale price. This fee does not go to the Loud Market team - but goes straight to the artists. This allows musicians to earn money from their work in the long run, after they have already sold their work.",
  },
  {
    id: "4",
    btnClass: "btn d-block text-left w-100 collapsed py-4",
    target: "#collapseFour",
    quote: "How do I create an NFT?",
    contentId: "collapseFour",
    contentClass: "collapse",
    content:
      "Simply go to “Create” on the menu at the top of the screen, or on the home page. From here you can upload your MP3 file, image URL, sale/auction price and royalty fee. You do not have to list NFTs straight for sale, and can just create and hold on to them for sale at a later date.",
  },
  {
    id: "5",
    btnClass: "btn d-block text-left w-100 collapsed py-4",
    target: "#collapseFive",
    quote: "What can be done about copyright breaches?",
    contentId: "collapseFive",
    contentClass: "collapse",
    content:
      "The team reserves the right to remove any NFTs and block any wallets associated with any copyright breaches. If you see any work that you think violates copyright laws then please inform the team and it will be removed after investigation.",
  },
];

class Faq extends Component {
  state = {
    initData: {},
    data: [],
  };
  componentDidMount() {
    this.setState({
      initData: initData,
      data: data,
    });
  }
  render() {
    return (
      <section className="faq-area pt-0">
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
          <div className="row justify-content-center">
            <div className="col-12">
              {/* FAQ Content */}
              <div className="faq-content">
                {/* Netstorm Accordion */}
                <div className="accordion" id="netstorm-accordion">
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-10">
                      {/* Single Accordion Item */}
                      {this.state.data.map((item, idx) => {
                        return (
                          <div
                            key={`fd_${idx}`}
                            className="single-accordion-item p-3"
                          >
                            {/* Card Header */}
                            <div className="card-header bg-inherit border-0 p-0">
                              <h2 className="m-0">
                                <button
                                  className={item.btnClass}
                                  type="button"
                                  data-toggle="collapse"
                                  data-target={item.target}
                                >
                                  {item.quote}
                                </button>
                              </h2>
                            </div>
                            <div
                              id={item.contentId}
                              className={item.contentClass}
                              data-parent="#netstorm-accordion"
                            >
                              {/* Card Body */}
                              <div className="card-body py-3">
                                {item.quote === "How can I buy Loud tokens?" ? (
                                  <div>
                                    You will need a MetaMask/TrustWallet
                                    connected to the BSC. Then you can buy $LOUD
                                    on PancakeSwap using either BNB or BUSC.
                                    <br />
                                    <a
                                      href="https://pancakeswap.finance/swap?outputCurrency=0x3d0e22387ddfe75d1aea9d7108a4392922740b96"
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Click here
                                    </a>{" "}
                                    to buy from PanCakeSwap
                                  </div>
                                ) : (
                                  <>{item.content}</>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Faq;
