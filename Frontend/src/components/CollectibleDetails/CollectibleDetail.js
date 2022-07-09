import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";
import { multipleAbi } from "../../multipleAbi";
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";
import Countdown from "react-countdown";
import { auctionAbi } from "../../core/constant";
import Modal from "react-modal";
import { toast } from "react-toastify";
import transferAbi from "../../abi.json";
import { ethers } from "ethers";

const initData = {
  itemImg: "/img/auction_2.jpg",
  date: "2022-03-30",
  tab_1: "Bids",
  tab_2: "History",
  tab_3: "Details",
  ownerImg: "/img/avatar_1.jpg",
  itemOwner: "Themeland",
  created: "15 Jul 2021",
  title: "Walking On Air",
  content: "",
  price_1: "1.5 ETH",
  price_2: "$500.89",
  count: "1 of 5",
  size: "14000 x 14000 px",
  volume: "64.1",
  highest_bid: "2.9 BNB",
  bid_count: "1 of 5",
  btnText: "Place a Bid",
};

const tabData_1 = [
  {
    id: "1",
    img: "/img/avatar_1.jpg",
    price: "14 ETH",
    time: "4 hours ago",
    author: "@arham",
  },
  {
    id: "2",
    img: "/img/avatar_2.jpg",
    price: "10 ETH",
    time: "8 hours ago",
    author: "@junaid",
  },
  {
    id: "3",
    img: "/img/avatar_3.jpg",
    price: "12 ETH",
    time: "3 hours ago",
    author: "@yasmin",
  },
];

const tabData_2 = [
  {
    id: "1",
    img: "/img/avatar_6.jpg",
    price: "32 ETH",
    time: "10 hours ago",
    author: "@hasan",
  },
  {
    id: "2",
    img: "/img/avatar_7.jpg",
    price: "24 ETH",
    time: "6 hours ago",
    author: "@artnox",
  },
  {
    id: "3",
    img: "/img/avatar_8.jpg",
    price: "29 ETH",
    time: "12 hours ago",
    author: "@meez",
  },
];

const sellerData = [
  {
    id: "1",
    img: "/img/avatar_1.jpg",
    seller: "@ArtNoxStudio",
    post: "Creator",
  },
  {
    id: "2",
    img: "/img/avatar_2.jpg",
    seller: "Virtual Worlds",
    post: "Collection",
  },
];

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#1c1c1b",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: "1000",
  },
};

export default function CollectibleDetail() {
  const [loading, setLoading] = useState(true);

  const [nftData, setNftData] = useState();
  // const [coverImage, setCoverImage] = useState();
  // const [auction, setAuction] = useState();
  const [account, setAccount] = useState("");
  const [auctionData, setAuctionData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [transferModal, setTransferModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  // const [transferAddress, setTransferAddress] = useState("");
  const [transferLoad, setTransferLoad] = useState(false);
  const [sender, setSender] = useState("");
  const [buyModal, setBuyModal] = useState(false);
  const [buyLoading, setBuyLoading] = useState();
  // const [auctionLoading, setAuctionLoading] = useState(false);
  // const [auctionModal, setAuctionModal] = useState(false);
  const [auctionTime, setAuctionTime] = useState();
  // const [highestBid, setHighestBid] = useState();
  // const [bidModal, setBidModal] = useState(false);
  // const [bidLoader, setBidLoader] = useState(false);
  // const [bidAmount, setBidAmount] = useState();
  const [copy, setCopy] = useState("Click to copy");
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [withdrawLoader, setWithDrawLoader] = useState(true);
  const [withdrawAmount, setWithDrawAmount] = useState();
  const [transferQuantity, setTransferQuantity] = useState("");
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [imageLoading, setImageLoading] = useState(true);
  const [loudPrice, setLoudPrice] = useState("");

  const TOKEN_CONTRACT_ADDRESS = "0x3d0e22387ddfe75d1aea9d7108a4392922740b96";
  const TOKEN_CONTRACT_ABI = JSON.parse(transferAbi.result);

  useEffect(() => {
    console.log("isnide here!");

    const getInfo = async () => {
      axios({
        url: "https://api.pancakeswap.info/api/v2/tokens/0x3d0e22387ddfe75d1aea9d7108a4392922740b96",
        method: "GET",
      })
        .then((res) => {
          console.log(Math.round(5 / res.data.data.price), "loud price");
          setLoudPrice(Math.round(5 / res.data.data.price));
        })
        .catch((error) => {
          console.log(error);
        });

      axios({
        url: "https://loud-backend.herokuapp.com/get_collectible_info",
        method: "POST",
        data: {
          tokenId: window.location.href.split("/").pop(),
        },
      })
        .then(async (response) => {
          console.log(response.data, "collectible data");
          let auctionAddress = response.data.collectible.auction_address;
          setNftData(response.data.collectible);
          if (localStorage.getItem("wallet")) {
            setAccount(localStorage.getItem("wallet"));
          }

          if (response.data.collectible.on_auction) {
            axios({
              url: "https://loud-backend.herokuapp.com/get_auction_details",
              method: "POST",
              data: {
                auction_address: auctionAddress,
              },
            })
              .then(async (res) => {
                console.log(res.data.auction, "this is res");
                var currentTime = Math.floor(Date.now() / 1000);
                const timer = (res.data.auction.end_time - currentTime) * 1000;
                console.log(timer, "this is timer!");
                setAuctionTime(timer);
                // console.log(date);
                setAuctionData(res.data.auction);
                setLoading(false);
              })
              .catch((e) => console.log(e));
          }

          //   console.log(localStorage.getItem("wallet"));
          setLoading(false);
        })
        .catch((e) => console.log(e));
    };
    getInfo();
  }, []);
  const openWithdraw = async () => {
    setWithdrawModal(true);
    if (window.ethereum) {
      console.log("inisde here haha");
      await window.ethereum.send("eth_requestAccounts");
      window.web3 = new Web3(window.ethereum);
      // const accounts = await window.ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      const accounts = await window.web3.eth.getAccounts();

      window.contract = await new window.web3.eth.Contract(
        auctionAbi,
        nftData.auction_address
      );
      const returns = await window.contract.methods
        .pendingReturns(accounts[0])
        .call();

      console.log(returns, "returns");
      if (returns === "0") {
        setWithDrawAmount(0);
        alert("You dont have any amount to withdraw");
        window.location.reload();
      } else {
        setWithDrawAmount(parseFloat(returns) / 1000000000000000000);
        setWithDrawLoader(false);
      }
    }
  };
  const withDraw = async () => {
    setWithDrawLoader(true);
    if (window.ethereum) {
      console.log("inisde here haha");
      await window.ethereum.send("eth_requestAccounts");
      window.web3 = new Web3(window.ethereum);
      // const accounts = await window.ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      const accounts = await window.web3.eth.getAccounts();

      window.contract = await new window.web3.eth.Contract(
        auctionAbi,
        nftData.auction_address
      );
      const returns = await window.contract.methods
        .withdraw()
        .send({
          from: accounts[0],
          gas: "4700000",
        })
        .on("transactionHash", function (hash) {
          console.log(hash, "money sent");

          axios({
            url: "https://loud-backend.herokuapp.com/bid_withdraw",
            method: "POST",
            data: {
              auctionAddress: nftData.auction_address,
              user: accounts[0],
            },
          })
            .then((res) => {
              alert("successfully withdrawn");
              window.location.reload();
            })
            .catch((e) => alert("some error occurred"));
        });
    }
  };

  const transferNft = async () => {
    setTransferLoad(true);
    if (sender === "" || transferQuantity === "") {
      toast.error("Fields cannot be empty", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTransferLoad(false);
      return;
    }

    if (transferLoad) {
      toast.error("Please wait.. transaction under progress!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      const accounts = await window.web3.eth.getAccounts();

      window.contract = await new window.web3.eth.Contract(
        multipleAbi,
        "0x0F72D59D536Fa3D8A8856fc392bBFDc7474A4c5A"
      );

      const send = await window.contract.methods
        .safeTransferFrom(
          accounts[0],
          sender,
          window.location.href.split("/").pop(),
          transferQuantity,
          sender
        )
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {
          console.log(hash, "this is tranfer hash");
          axios({
            method: "POST",
            url: "https://loud-backend.herokuapp.com/update_collectible_history",
            data: {
              tokenId: window.location.href.split("/").pop(),
              newOwner: sender,
              currentOwner: accounts[0],
              txHash: hash,
              transferQuantity: transferQuantity,
              image: nftData.coverImage,
              itemPrice: nftData.item_price,
              name: nftData.name,
              onSale: nftData.on_sale,
            },
          }).then((res) => {
            if (res.data === "success") {
              setTransferLoad(false);
              toast.success("successfully transfered", {
                position: toast.POSITION.TOP_CENTER,
              });
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }
          });
        })
        .on("error", (error) => {
          console.log(error);
          toast.error("Transaction Rejected", {
            position: toast.POSITION.TOP_CENTER,
          });
          setTransferLoad(false);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
    }
  };

  const stopSale = async () => {
    setLoading(true);
    axios({
      method: "POST",
      url: "https://loud-backend.herokuapp.com/stop_collectible_sale",
      data: {
        tokenId: window.location.href.split("/").pop(),
      },
    })
      .then((res) => {
        setLoading(false);
        toast.success("Sale Ended", {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((e) => alert("error occurred"));
  };

  const startSale = async () => {
    setLoading(true);
    let token_created_id;
    axios({
      method: "POST",
      url: "https://loud-backend.herokuapp.com/get_user_details",
      data: {
        user: nftData.owned_by,
      },
    }).then(async (res) => {
      if (res.data.multiple_transfer) {
        axios({
          method: "POST",
          url: "https://loud-backend.herokuapp.com/start_collectible_Sale",
          data: {
            tokenId: window.location.href.split("/").pop(),
          },
        })
          .then((response) => {
            setLoading(false);
            toast.success("Sale Started..", {
              position: toast.POSITION.TOP_CENTER,
            });
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((err) => alert("error occurred"));
      } else {
        if (window.ethereum) {
          console.log("inisde here haha");
          await window.ethereum.send("eth_requestAccounts");
          window.web3 = new Web3(window.ethereum);

          const accounts = await window.web3.eth.getAccounts();

          window.contract = await new window.web3.eth.Contract(
            multipleAbi,
            "0x0F72D59D536Fa3D8A8856fc392bBFDc7474A4c5A"
          );
          console.log(token_created_id, "this is token Id");

          const theOwner = await window.contract.methods
            .setApprovalForAll(
              "0x4E600a198Ed78A019E868b3A5a1cF149545bcEd5",
              "True"
            )
            .send({ from: accounts[0] })
            .on("transactionHash", function (hash) {
              console.log(hash, "this is approve hash");

              axios({
                method: "POST",
                url: "https://loud-backend.herokuapp.com/start_collectible_Sale",
                data: {
                  tokenId: window.location.href.split("/").pop(),
                },
              })
                .then((resp) => {
                  setLoading(false);
                  toast.success("Sale Started", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                  setTimeout(() => {
                    window.location.reload();
                  }, 3000);
                })
                .catch((err) => alert("error occurred"));
            })
            .on("error", (error) => {
              console.log(error, "err");
              setLoading(false);
            });
        }
      }
    });
  };

  const copyText = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopy("Copied");
  };

  const buyNft = async () => {
    console.log("we are here!");
    setBuyLoading(true);
    if (buyQuantity === "" || buyQuantity < 0 || isNaN(buyQuantity)) {
      toast.error("Enter a valid number..", {
        position: toast.POSITION.TOP_CENTER,
      });
      setBuyLoading(false);
      return;
    }

    if (buyQuantity > nftData.quantity) {
      toast.error("Required Number of NFT not present", {
        position: toast.POSITION.TOP_CENTER,
      });
      setBuyLoading(false);
      return;
    }

    if (window.ethereum) {
      console.log("inisde here");
      await window.ethereum.send("eth_requestAccounts");
      window.web3 = new Web3(window.ethereum);

      const accounts = await window.web3.eth.getAccounts();
      let total_price =
        parseFloat(nftData.item_price) * parseFloat(buyQuantity) + loudPrice;

      window.contract = await new window.web3.eth.Contract(
        TOKEN_CONTRACT_ABI,
        TOKEN_CONTRACT_ADDRESS
      );

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const eContract = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ABI,
        signer
      );

      let tokenBalance = await eContract.balanceOf(accounts[0]);
      console.log(total_price, "this is total price");
      if (tokenBalance / 1000000000000000000 < total_price) {
        toast.error("Insufficient Balance", {
          position: toast.POSITION.TOP_CENTER,
        });
        setBuyLoading(false);
        return;
      }

      const send = await window.contract.methods
        .transfer(
          "0x4E600a198Ed78A019E868b3A5a1cF149545bcEd5",
          ethers.utils.parseEther(String(total_price))
        )
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {
          console.log(hash, "money sent");
        })
        .on("receipt", function (receipt) {
          console.log(receipt, "this is receipt");
          axios({
            method: "POST",
            url: "https://loud-backend.herokuapp.com/transfer_collectible",
            data: {
              toAddress: accounts[0],
              fromAddress: nftData.owned_by,
              tokenId: window.location.href.split("/").pop(),
              itemPrice: nftData.item_price,
              creator: nftData.created_by,
              music: nftData.music,
              coverImage: nftData.cover_image,
              quantity: buyQuantity,
              totalQuantity: nftData.quantity,
              owner: nftData.owned_by,
              royalty: nftData.royalty,
              transactionHash: receipt.transactionHash,
              receipt: receipt,
            },
          })
            .then((res) => {
              console.log(res, "afterBuying");
              toast.success("Successfully Purchased", {
                position: toast.POSITION.TOP_CENTER,
              });
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            })
            .catch((e) => console.log(e));
        })
        .on("error", (error) => {
          console.log(error, "err");
          setBuyLoading(false);
        });
    }
  };

  return (
    <div>
      {loading ? (
        <div style={{ height: "80vh" }}>
          <center>
            <div class="fa-3x mt-5 pt-5">
              <i class="fas fa-spinner fa-spin"></i>
              <p>Please wait...</p>
            </div>
          </center>
        </div>
      ) : (
        <section className="item-details-area">
          {/* transfer modal */}

          <Modal
            isOpen={transferModal}
            // onAfterOpen={afterOpenModal}
            onRequestClose={() => setModalOpen(false)}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div style={{ width: "32vw", height: "45vh" }}>
              {transferLoad ? (
                <div>
                  <center>
                    <div class="fa-3x mt-5 pt-5">
                      <i class="fas fa-spinner fa-spin"></i>
                      <p>Please wait the transaction is being processed...</p>
                      <p>Do not refresh the page</p>
                    </div>
                  </center>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      fontSize: "28px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ color: "white", fontWeight: "bold" }}>
                      Transfer Token
                    </div>
                    <div
                      style={{ cursor: "pointer", color: "white" }}
                      onClick={() => setTransferModal(false)}
                    >
                      x
                    </div>
                  </div>
                  <div className="pt-3">Enter Transfer Address:</div>
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Transfer Address"
                    style={{
                      background: "none",
                      padding: "24px",
                    }}
                    onChange={(e) => setSender(e.target.value)}
                  />

                  <div className="pt-3">Enter Quantity to Transfer:</div>
                  <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Transfer Quantity"
                    style={{
                      background: "none",
                      padding: "24px",
                    }}
                    onChange={(e) => setTransferQuantity(e.target.value)}
                  />
                  <div
                    className="d-block btn btn-bordered-white mt-5"
                    onClick={() => transferNft()}
                  >
                    Transfer Token
                  </div>
                </>
              )}
            </div>
          </Modal>

          {/* share modal */}
          <Modal
            isOpen={shareModal}
            // onAfterOpen={afterOpenModal}
            onRequestClose={() => setShareModal(false)}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div style={{ width: "500px", color: "white" }}>
              <h4>Share</h4>
              <a href={window.location.href}>{window.location.href}</a>

              <center
                className="mt-5"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  className="d-block btn btn-bordered-white "
                  onClick={copyText}
                >
                  {copy}
                </div>
                <a
                  className="d-block btn btn-bordered-white ml-3"
                  href={`https://twitter.com/intent/tweet?text=${window.location.href}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Tweet
                </a>
              </center>
            </div>
          </Modal>

          {/* buy modal */}
          <Modal
            isOpen={buyModal}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={() => setModalOpen(false)}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {buyLoading ? (
              <center style={{ width: "32vw", height: "32vh" }}>
                <div class="fa-3x mt-5 pt-5">
                  <i class="fas fa-spinner fa-spin"></i>
                  <p>Please wait the transaction is being processed...</p>
                  <p>Do not refresh the page</p>
                </div>
              </center>
            ) : (
              <div style={{ width: "32vw", height: "55vh" }}>
                <div
                  style={{
                    fontSize: "28px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Buy Now</div>
                  <div
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => setBuyModal(false)}
                  >
                    x
                  </div>
                </div>
                <div>
                  <div className="pt-5">Enter Quantity to Purchase:</div>
                  <input
                    type="number"
                    className="form-control mt-2"
                    placeholder="Quantity"
                    min="1"
                    value={buyQuantity}
                    style={{
                      background: "none",
                      padding: "24px",
                    }}
                    onChange={(e) => setBuyQuantity(e.target.value)}
                  />
                  <div className="pt-5 d-flex justify-content-between">
                    <div> Item price:</div>
                    <div> {nftData.item_price + "  LOUD"}</div>
                  </div>
                  <div className=" d-flex justify-content-between">
                    <div> Buy Quantity</div>
                    <div> {buyQuantity}</div>
                  </div>
                  <div
                    className="pt-2 d-flex justify-content-between pb-2"
                    style={{ borderBottom: "1px solid white" }}
                  >
                    <div> Transfer Fee:</div>
                    <div> {loudPrice + "  LOUD"}</div>
                  </div>
                  <div className="pt-2 d-flex justify-content-between pb-2">
                    <div> Total:</div>
                    <div>
                      {" "}
                      {buyQuantity > 0
                        ? (
                            parseFloat(nftData.item_price) *
                              parseFloat(buyQuantity) +
                            parseFloat(loudPrice)
                          ).toFixed(3)
                        : 0}{" "}
                      LOUD
                    </div>
                  </div>
                  <div
                    className="d-block btn btn-bordered-white mt-4 mb-2"
                    onClick={() => buyNft()}
                  >
                    Buy
                  </div>
                </div>
              </div>
            )}
          </Modal>

          <div className="container">
            <div className="row justify-content-between">
              <div className="col-12 col-lg-5">
                <div className="item-info">
                  <div className="item-thumb text-center">
                    {imageLoading ? (
                      <div class="fa-3x mt-5 pt-5">
                        <i class="fas fa-spinner fa-spin"></i>
                      </div>
                    ) : (
                      ""
                    )}

                    <img
                      src={nftData.cover_image}
                      alt=""
                      onLoad={() => setImageLoading(false)}
                    />
                  </div>
                  <div className="card no-hover countdown-times my-4">
                    <ReactAudioPlayer
                      src={nftData.music}
                      // autoPlay
                      controls
                      style={{ width: "100%" }}
                    />
                  </div>
                  {/* Netstorm Tab */}
                  <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
                    <li>
                      <a
                        className="active"
                        id="nav-home-tab"
                        data-toggle="pill"
                        href="#nav-home"
                      >
                        <h5 className="m-0">{initData.tab_1}</h5>
                      </a>
                    </li>
                    <li>
                      <a
                        id="nav-profile-tab"
                        data-toggle="pill"
                        href="#nav-profile"
                      >
                        <h5 className="m-0">{initData.tab_2}</h5>
                      </a>
                    </li>
                  </ul>
                  {/* Tab Content */}
                  <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-home">
                      <ul className="list-unstyled">
                        {/* Single Tab List */}
                        {nftData.on_auction ? (
                          <div>
                            {auctionData ? (
                              auctionData.bidders.length > 0 ? (
                                <>
                                  {" "}
                                  {auctionData.bidders.map((item, idx) => {
                                    return (
                                      <li
                                        key={`tdo_${idx}`}
                                        className="single-tab-list d-flex align-items-center"
                                      >
                                        <img
                                          className="avatar-sm rounded-circle mr-3"
                                          src="https://image.flaticon.com/icons/png/512/1203/1203435.png"
                                          alt=""
                                        />
                                        <p className="m-0">
                                          Bid listed for{" "}
                                          <strong>{item.amount}</strong>{" "}
                                          {item.time} <br />
                                          by{" "}
                                          <a
                                            href={`/artist/${item.bidder_address}`}
                                          >
                                            {item.bidder_address.slice(0, 6) +
                                              "..."}
                                          </a>
                                        </p>
                                      </li>
                                    );
                                  })}
                                </>
                              ) : (
                                <div className="mt-4">No data</div>
                              )
                            ) : (
                              <div className="mt-4">No data</div>
                            )}
                          </div>
                        ) : (
                          <div className="mt-4">No data</div>
                        )}
                      </ul>
                    </div>
                    <div className="tab-pane fade" id="nav-profile">
                      <ul className="list-unstyled">
                        {/* Single Tab List */}
                        {nftData.tx_history.map((item, idx) => {
                          return (
                            <li
                              key={`tdt_${idx}`}
                              className="single-tab-list d-flex align-items-center"
                            >
                              <img
                                className="avatar-sm rounded-circle mr-3"
                                src={
                                  item.selling_type === "Minting"
                                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREg3xlaYCTTZx54R4EJIUfcls3C_JjJUUInQ&usqp=CAU"
                                    : item.selling_type === "Transfer"
                                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Transfer-left_right.svg/758px-Transfer-left_right.svg.png"
                                    : "https://image.freepik.com/free-vector/sold-out-price-tag-sign_123447-162.jpg"
                                }
                                alt=""
                              />
                              {item.selling_type === "auction" ? (
                                <p className="m-0">
                                  Nft sold in auction for{" "}
                                  <strong>
                                    {parseFloat(item.sold_for) /
                                      1000000000000000000}
                                  </strong>
                                  {" BNB"}
                                  {item.time} <br />
                                  {/* by <a href="/author">{item.author}</a> */}
                                </p>
                              ) : item.selling_type === "Transfer" ? (
                                <p className="m-0">
                                  Token Transfer to{" "}
                                  <strong>{item.to.slice(0, 6) + "..."}</strong>
                                  <br />
                                  {/* by <a href="/author">{item.author}</a> */}
                                </p>
                              ) : (
                                <p className="m-0">
                                  Token Minted by{" "}
                                  <strong>{item.to.slice(0, 6) + "..."}</strong>
                                  <br />
                                  {/* by <a href="/author">{item.author}</a> */}
                                </p>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                {/* Content */}
                <div className="content mt-5 mt-lg-0">
                  <h3 className="m-0">{nftData.name}</h3>
                  <p>{nftData.description}</p>
                  {/* Owner */}
                  <div className="owner d-flex align-items-center">
                    <span>Owned By</span>
                    <a
                      className="owner-meta d-flex align-items-center ml-3"
                      href={`/artist/${nftData.owned_by}`}
                    >
                      <img
                        className="avatar-sm rounded-circle"
                        src={
                          nftData.owner_image === ""
                            ? "data:image/jpeg;base64,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"
                            : nftData.owner_image
                        }
                        alt=""
                      />
                      <h6 className="ml-2">
                        {nftData.owned_by.slice(0, 8) + "..."}
                      </h6>
                    </a>
                  </div>
                  {/* Item Info List */}
                  <div className="item-info-list mt-4">
                    <ul className="list-unstyled">
                      <li className="price d-flex justify-content-between">
                        <span>
                          Current Price: {nftData.item_price + " LOUD"}
                        </span>
                        <span>Quantity: {nftData.quantity}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="row items">
                    <div className="col-12  item px-lg-2">
                      <div className="card no-hover">
                        <div className="single-seller d-flex align-items-center">
                          {nftData.owned_by === account.toLowerCase() ? (
                            <div
                              className="d-block btn btn-bordered-white ml-5"
                              onClick={() => setTransferModal(true)}
                            >
                              Transfer
                            </div>
                          ) : (
                            ""
                          )}

                          <div
                            className="d-block btn btn-bordered-white ml-5"
                            onClick={() => setShareModal(true)}
                          >
                            Share
                          </div>
                          {!nftData.on_auction ? (
                            nftData.auction_address ? (
                              nftData.auction_address !== "" ? (
                                <div
                                  className="d-block btn btn-bordered-white ml-5"
                                  onClick={() => openWithdraw()}
                                >
                                  Withdraw
                                </div>
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    {nftData.on_auction ? (
                      <div className="col-12 item px-lg-2">
                        <div className="card no-hover">
                          <h4 className="mt-0 mb-2">
                            {auctionTime ? (
                              Date.now() + auctionTime < Date.now() ? (
                                "Auction Ended"
                              ) : (
                                <Countdown date={Date.now() + auctionTime} />
                              )
                            ) : (
                              "..."
                            )}
                          </h4>
                          <div className="price d-flex justify-content-between align-items-center">
                            <span>{"Highest Bid"}</span>
                            <span>
                              {auctionData
                                ? auctionData.highest_bid === ""
                                  ? "No bids"
                                  : auctionData.highest_bid
                                : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {nftData.owned_by.toLowerCase() === account.toLowerCase() ? (
                    nftData.on_auction ? (
                      ""
                    ) : (
                      // <div>
                      //   <a
                      //     className="d-block btn btn-bordered-white mt-4"
                      //     href="/wallet-connect"
                      //   >
                      //     Stop auction
                      //   </a>
                      // </div>
                      ""
                      // <div>
                      //   <a
                      //     className="d-block btn btn-bordered-white mt-4"
                      //     href="/wallet-connect"
                      //   >
                      //     Start Auction
                      //   </a>
                      // </div>
                    )
                  ) : nftData.on_auction ? (
                    <div>
                      <a
                        className="d-block btn btn-bordered-white mt-4"
                        href="/wallet-connect"
                      >
                        {initData.btnText}
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                  {nftData.owned_by.toLowerCase() === account.toLowerCase() ? (
                    nftData.on_sale ? (
                      <div>
                        <div
                          className="d-block btn btn-bordered-white mt-4"
                          onClick={() => stopSale()}
                        >
                          Stop Sale
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div
                          className="d-block btn btn-bordered-white mt-4"
                          onClick={() => startSale()}
                        >
                          Start Sale
                        </div>
                      </div>
                    )
                  ) : nftData.on_sale && account ? (
                    <div>
                      {nftData.quantity > 0 ? (
                        <div
                          className="d-block btn btn-bordered-white mt-4"
                          onClick={() => setBuyModal(true)}
                        >
                          Buy Now
                        </div>
                      ) : (
                        <div className="d-block btn btn-bordered-white mt-4">
                          Sold Out
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
