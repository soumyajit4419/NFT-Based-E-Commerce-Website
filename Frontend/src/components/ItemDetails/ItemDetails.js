import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";
import { auctionAbi } from "../../core/constant";
import { contractAbi } from "../../abi";
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";
import Modal from "react-modal";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import transferAbi from "../../abi.json";

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
    height: "45vh",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: "1000",
  },
};

export default function ItemDetails() {
  const [loading, setLoading] = useState(true);

  const [nftData, setNftData] = useState();
  const [coverImage, setCoverImage] = useState();
  const [auction, setAuction] = useState();
  const [account, setAccount] = useState("");
  const [auctionData, setAuctionData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [transferModal, setTransferModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [transferAddress, setTransferAddress] = useState("");
  const [transferLoad, setTransferLoad] = useState(false);
  const [sender, setSender] = useState("");
  const [buyModal, setBuyModal] = useState(false);
  const [buyLoading, setBuyLoading] = useState();
  const [auctionLoading, setAuctionLoading] = useState(false);
  const [auctionModal, setAuctionModal] = useState(false);
  const [auctionTime, setAuctionTime] = useState("");
  const [highestBid, setHighestBid] = useState();
  const [bidModal, setBidModal] = useState(false);
  const [bidLoader, setBidLoader] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [copy, setCopy] = useState("Click to copy");
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [withdrawLoader, setWithDrawLoader] = useState(true);
  const [withdrawAmount, setWithDrawAmount] = useState();
  const [imageLoading, setImageLoading] = useState(true);
  const [initialPrice, setInitialPrice] = useState("");
  const [startSaleModal, setStartSaleModal] = useState(false);
  const [startSaleLoader, setStartSaleLoader] = useState();
  const [pendingReturn, setPendingReturns] = useState("");
  const [loudPrice, setLoudPrice] = useState("");

  const TOKEN_CONTRACT_ADDRESS = "0x3d0e22387ddfe75d1aea9d7108a4392922740b96";
  const TOKEN_CONTRACT_ABI = JSON.parse(transferAbi.result);

  const handleClose = () => {
    setModalOpen(false);
  };

  // const handleListItemClick = (value) => {
  //   setModalOpen(true)
  // };

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
        url: "https://loud-backend.herokuapp.com/get_token_info",
        method: "POST",
        data: {
          tokenId: window.location.href.split("/").pop(),
        },
      })
        .then(async (response) => {
          console.log(response.data.nft, "nft deatils");
          let auctionAddress = response.data.nft.auction_address;

          if (auctionAddress) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const eContract = new ethers.Contract(
              auctionAddress,
              auctionAbi,
              signer
            );

            try {
              const account = localStorage.getItem("wallet");
              let val = await eContract.PendingReturns();
              setPendingReturns(val / 1000000000000000000);
            } catch (er) {
              console.log(er, "pending err");
            }
          }

          setNftData(response.data.nft);

          if (localStorage.getItem("wallet")) {
            setAccount(localStorage.getItem("wallet"));
          }

          if (response.data.nft.on_auction) {
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
          setLoading(false);

          //   console.log(localStorage.getItem("wallet"));
        })
        .catch((e) => console.log(e));
    };
    getInfo();
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  const buyNft = async () => {
    console.log("we are here!");
    setBuyLoading(true);
    if (window.ethereum) {
      console.log("inisde here");
      await window.ethereum.send("eth_requestAccounts");
      window.web3 = new Web3(window.ethereum);
      const accounts = await window.web3.eth.getAccounts();

      window.contract = await new window.web3.eth.Contract(
        TOKEN_CONTRACT_ABI,
        TOKEN_CONTRACT_ADDRESS
      );

      let total_price = parseFloat(nftData.initial_price) + loudPrice;
      console.log(total_price, "this is total price");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const eContract = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ABI,
        signer
      );

      let tokenBalance = await eContract.balanceOf(accounts[0]);
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
            url: "https://loud-backend.herokuapp.com/transfer_nft",
            data: {
              toAddress: accounts[0],
              fromAddress: nftData.owned_by,
              tokenId: window.location.href.split("/").pop(),
              initial_price: nftData.initial_price,
              creator: nftData.created_by,
              owner: nftData.owned_by,
              music: nftData.music,
              cover_image: nftData.cover_image,
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
            .catch((e) => {
              toast.error("Error Processing Transaction..", {
                position: toast.POSITION.TOP_CENTER,
              });
              console.log(e, "buynow error");
            });
        })
        .on("error", (error) => {
          console.log(error, "err");
          setBuyLoading(false);
        });
    }
  };
  const transferNft = async () => {
    setTransferLoad(true);
    if (sender === "") {
      toast.error("Address cannot be empty", {
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
        contractAbi,
        "0xE33DD0476E01975D184738eE5a8911e35b44631B"
      );

      const send = await window.contract.methods
        .transferFrom(
          accounts[0],
          sender,
          window.location.href.split("/").pop()
        )
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {
          console.log(hash, "this is tranfer hash");
          axios({
            method: "POST",
            url: "https://loud-backend.herokuapp.com/update_nft_history",
            data: {
              tokenId: window.location.href.split("/").pop(),
              newOwner: sender,
              currentOwner: accounts[0],
              txHash: hash,
            },
          }).then((res) => {
            if (res.data === "success") {
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

  const startAuction = async () => {
    setAuctionLoading(true);

    console.log(nftData.auction_address, "this is it!");

    if (auctionTime === "") {
      toast.error("Enter a Valid Auction Time", {
        position: toast.POSITION.TOP_CENTER,
      });
      setAuctionLoading(false);
      return;
    }

    if (nftData.auction_address && nftData.auction_address !== "") {
      alert("Pending auctions Detected!");
      window.location.reload();
      return;
    }

    // setAuctionStatus("Deploying Auction Contract!");
    if (window.ethereum) {
      try {
        console.log("inisde here");
        await window.ethereum.send("eth_requestAccounts");
        window.web3 = new Web3(window.ethereum);
        // const accounts = await window.ethereum.request({
        //   method: "eth_requestAccounts",
        // });
        const accounts = await window.web3.eth.getAccounts();
        const finalTime = parseInt(auctionTime);

        var _biddingTime = finalTime * 60 * 60;
        // console.log(_biddingTime);
        // return;
        var _beneficiary = "0x4E600a198Ed78A019E868b3A5a1cF149545bcEd5";
        var simpleauctionContract = new window.web3.eth.Contract(auctionAbi);
        if (!nftData.transfer) {
          // setAuctionStatus("Tranfering to Auction");

          console.log("putting on sale");
          // setCurrentHeading("Putting on Sale");
          if (window.ethereum) {
            console.log("inisde here haha");
            await window.ethereum.send("eth_requestAccounts");
            window.web3 = new Web3(window.ethereum);
            // const accounts = await window.ethereum.request({
            //   method: "eth_requestAccounts",
            // });
            const accounts = await window.web3.eth.getAccounts();

            window.contract = await new window.web3.eth.Contract(
              contractAbi,
              "0xE33DD0476E01975D184738eE5a8911e35b44631B"
            );
            console.log(
              window.location.href.split("/").pop(),
              "this is token Id"
            );

            const theOwner = await window.contract.methods
              .approve(
                "0x4E600a198Ed78A019E868b3A5a1cF149545bcEd5",
                window.location.href.split("/").pop()
              )
              .send({ from: accounts[0] })
              .on("transactionHash", function (hash) {
                console.log(hash, "this is approved hash");
                // setAuctionStatus("Deploying Auction");
              })
              .on("error", (error) => {
                // console.log(error, "auction error");
                setAuctionLoading(false);
              });
          }
        }

        var startAuctionHash = "";

        var simpleauction = simpleauctionContract
          .deploy({
            data: "6080604052733d0e22387ddfe75d1aea9d7108a4392922740b96600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034801561006557600080fd5b50604051604080610fba8339810180604052604081101561008557600080fd5b810190808051906020019092919080519060200190929190505050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055504260018190555081600381905550600354600154016002819055505050610eae8061010c6000396000f3fe6080604052600436106100f1576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063167fb50e146100f65780631a566b91146101215780632a24f46c1461015057806338af3eed146101675780633ccfd60b146101be578063454a2ab3146101ed5780634b449cba146102285780634f245ef7146102535780635c12322c1461027e57806373d55379146102ad57806383ffda3b1461030457806391f9015714610369578063996657af146103c0578063b2c532af14610417578063d074a38d14610442578063d57bde791461046d578063e77e2b2f14610498575b600080fd5b34801561010257600080fd5b5061010b6104c3565b6040518082815260200191505060405180910390f35b34801561012d57600080fd5b506101366104cd565b604051808215151515815260200191505060405180910390f35b34801561015c57600080fd5b506101656104e4565b005b34801561017357600080fd5b5061017c610627565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101ca57600080fd5b506101d361064c565b604051808215151515815260200191505060405180910390f35b3480156101f957600080fd5b506102266004803603602081101561021057600080fd5b8101908080359060200190929190505050610873565b005b34801561023457600080fd5b5061023d610d44565b6040518082815260200191505060405180910390f35b34801561025f57600080fd5b50610268610d4e565b6040518082815260200191505060405180910390f35b34801561028a57600080fd5b50610293610d54565b604051808215151515815260200191505060405180910390f35b3480156102b957600080fd5b506102c2610d67565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561031057600080fd5b506103536004803603602081101561032757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d90565b6040518082815260200191505060405180910390f35b34801561037557600080fd5b5061037e610dd9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156103cc57600080fd5b506103d5610dff565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561042357600080fd5b5061042c610e29565b6040518082815260200191505060405180910390f35b34801561044e57600080fd5b50610457610e70565b6040518082815260200191505060405180910390f35b34801561047957600080fd5b50610482610e76565b6040518082815260200191505060405180910390f35b3480156104a457600080fd5b506104ad610e7c565b6040518082815260200191505060405180910390f35b6000600654905090565b6000600860009054906101000a900460ff16905090565b60025442101515156104f557600080fd5b600860009054906101000a900460ff1615151561051157600080fd5b6001600860006101000a81548160ff0219169083151502179055507fdaec4582d5d9595688c8c98545fdd1c696d41c6aeaeb636737e84ed2f5c00eda600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600654604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a16000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6006549081150290604051600060405180830381858888f19350505050158015610624573d6000803e3d6000fd5b50565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050600081111561086a576000600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b1580156107a457600080fd5b505af11580156107b8573d6000803e3d6000fd5b505050506040513d60208110156107ce57600080fd5b8101908080519060200190929190505050151561084e5780600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000600860016101000a81548160ff0219169083151502179055506000915050610870565b6001600860016101000a81548160ff0219169083151502179055505b60019150505b90565b600254421115151561088457600080fd5b6006548111151561089457600080fd5b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b15801561095157600080fd5b505afa158015610965573d6000803e3d6000fd5b505050506040513d602081101561097b57600080fd5b81019080805190602001909291905050509050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b158015610a8757600080fd5b505af1158015610a9b573d6000803e3d6000fd5b505050506040513d6020811015610ab157600080fd5b8101908080519060200190929190505050506000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b158015610b8057600080fd5b505afa158015610b94573d6000803e3d6000fd5b505050506040513d6020811015610baa57600080fd5b810190808051906020019092919050505090508181039250600073ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610c8c5760065460076000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b33600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550826006819055507ff4757a49b326036464bec6fe419a4ae38c8a02ce3e68bf0809674f6aab8ad3003384604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1505050565b6000600254905090565b60015481565b600860019054906101000a900460ff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b60035481565b60065481565b6002548156fea165627a7a72305820a60d33bbc097a5859bee70136d1bf85b99bf34c71ef8899ac79e45e7013215200029",
            arguments: [_biddingTime, _beneficiary],
          })
          .send({
            from: accounts[0],
            gas: "4700000",
            gasPrice: 100000000000, // 100 gwei
          })
          .on("transactionHash", function (hash) {
            console.log(hash, "money sent");
            startAuctionHash = hash;
          })
          .on("receipt", async function (receipt) {
            console.log(receipt, "this is receipt");
            window.contract = await new window.web3.eth.Contract(
              auctionAbi,
              receipt.contractAddress
            );

            const endtTime = await window.contract.methods
              .auctionEndTime()
              .call()
              .then((res) => {
                axios({
                  method: "POST",
                  url: "https://loud-backend.herokuapp.com/create_auction",
                  data: {
                    contractAddress: receipt.contractAddress,
                    endTime: res,
                    tokenId: window.location.href.split("/").pop(),
                    address: accounts[0],
                    txHash: startAuctionHash,
                  },
                });
              })
              .then((res) => {
                console.log(res, "endt time da");
                toast.success("Auction Started", {
                  position: toast.POSITION.TOP_CENTER,
                });
                setAuctionLoading(false);
                setAuctionModal(false);
                setTimeout(() => {
                  window.location.reload();
                }, 3000);

                // setAuctionStatus("Auction Started!");
              });
          })
          .on("error", (error) => {
            console.log(error, "auction error");
            toast.error("Transaction Rejected", {
              position: toast.POSITION.TOP_CENTER,
            });
            setAuctionLoading(false);
            setAuctionModal(false);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const sendBid = async () => {
    console.log(parseInt(bidAmount), "this is currentBid");
    console.log(typeof currentBid, "this is type");
    setBidLoader(true);
    if (bidAmount === "" || bidAmount <= 0) {
      toast.error("Enter a valid amount", {
        position: toast.POSITION.TOP_CENTER,
      });
      setBidLoader(false);
      return;
    }

    if (bidAmount < parseFloat(nftData.initial_price)) {
      toast.error("Cannot Place bid: Bid amount Lower than item price", {
        position: toast.POSITION.TOP_CENTER,
      });
      setBidLoader(false);
      return;
    }

    if (parseFloat(auctionData.highest_bid) >= bidAmount) {
      toast.error("Bid Higher", {
        position: toast.POSITION.TOP_CENTER,
      });
      setBidLoader(false);
      return;
    }

    // setBidModalLoader(true);
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

      window.tokenContract = await new window.web3.eth.Contract(
        contractAbi,
        "0x3d0e22387ddfe75d1aea9d7108a4392922740b96" //testnet loud
      );

      let approveAmount = "10000000000000000000000000000000";
      const approve = await window.tokenContract.methods
        .approve(nftData.auction_address, approveAmount)
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {
          console.log(hash, "this is approve hash");
        })
        .on("error", (error) => {
          console.log(error, "bidding error");
        });

      // var etherAmount = window.web3.utils.toBN(parseInt(currentBid));
      // var weiValue = window.web3.utils.toWei(etherAmount, "ether");
      // console.log(weiValue, "this is weiValue");
      let biddingPrice = ethers.utils.parseEther(bidAmount);

      var bidHash = "";
      const startBidding = await window.contract.methods
        .bid(biddingPrice)
        .send({
          from: accounts[0],
          gas: 470000,
          gasPrice: 100000000000, // 100 gwei
          value: 0,
        })
        .on("transactionHash", function (hash) {
          console.log(hash, "money sent");
          bidHash = hash;
        })
        .on("receipt", function (receipt) {
          console.log(receipt, "this is receipt");
          // alert("succesffully deposited");
          // bidModal(false);
          axios({
            method: "POST",
            url: "https://loud-backend.herokuapp.com/create_bid",
            data: {
              from: receipt.from,
              bidAmount: bidAmount,
              auction_address: nftData.auction_address,
              txHash: bidHash,
            },
          }).then((res) => {
            toast.success("successfully placed Bid!", {
              position: toast.POSITION.TOP_CENTER,
            });
            setTimeout(() => {
              window.location.reload();
            }, 3000);
            // setBidModalLoader(false);
          });
        })
        .on("error", (error) => {
          console.log(error);
          toast.error("Transaction Rejected", {
            position: toast.POSITION.TOP_CENTER,
          });
          setBidLoader(false);
        });
    }
  };

  const endAuction = async () => {
    // alert("auction has ended");
    //write logic for auction ending

    console.log(auctionData, "this is auction Data");
    setLoading(true);
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
        auctionData.contract_address
      );
      const highestBid = await window.contract.methods.highestBid().call();

      const highestBidder = await window.contract.methods
        .highestBidder()
        .call();
      console.log(highestBid, highestBidder, "lol");

      const endAuction = await window.contract.methods
        .auctionEnd()
        .send({
          from: accounts[0],
          gas: 470000,
          gasPrice: 100000000000, // 100 gwei
        })
        .on("transactionHash", function (hash) {
          console.log(hash, "money sent");
          axios({
            method: "POST",
            url: "https://loud-backend.herokuapp.com/end_auction",
            data: {
              highestBid: highestBid,
              highestBidder: highestBidder,
              auctionAddress: auctionData.contract_address,
              auctionCreator: nftData.owned_by,
              tokenId: window.location.href.split("/").pop(),
              royalty: nftData.royalty,
              creator: nftData.created_by,
            },
          })
            .then((endres) => {
              toast.success("Auction Ended ", {
                position: toast.POSITION.TOP_CENTER,
              });
              setNftData(endres.data.nft);
              setLoading(false);
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            })
            .catch((e) => alert("some error occurred"));
        })
        .on("error", (error) => {
          console.log(error);
          toast.error("Transaction Rejected", {
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
        });
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopy("Copied");
  };

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
      const ret = pendingReturn;

      console.log(ret, "returns");
      if (ret === "0") {
        setWithDrawAmount(0);
        alert("You dont have any amount to withdraw");
        window.location.reload();
      } else {
        setWithDrawAmount(ret);
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
          gasPrice: 100000000000, // 100 gwei
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
              toast.success("Successfully Withdrawn", {
                position: toast.POSITION.TOP_CENTER,
              });
              setTimeout(() => {
                window.location.reload();
              }, 2000);
              window.location.reload();
            })
            .catch((e) => alert("some error occurred"));
        });
    }
  };

  const stopSale = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: "https://loud-backend.herokuapp.com/stop_nft_sale",
      data: {
        tokenId: window.location.href.split("/").pop(),
      },
    })
      .then((res) => {
        console.log(res, "sale stop");
        setLoading(false);
        toast.success("Sale Ended", {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const startSale = async () => {
    if (initialPrice === "") {
      toast.error("Enter A Valid Price", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setLoading(true);
    setBidModal(false);
    var currentAccount;
    if (window.ethereum) {
      console.log("inisde here haha");
      await window.ethereum.send("eth_requestAccounts");
      window.web3 = new Web3(window.ethereum);
      // const accounts = await window.ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      const accounts = await window.web3.eth.getAccounts();
      currentAccount = accounts[0];

      console.log(accounts[0], "this is the account!");
    }

    console.log(currentAccount, "this is current account");
    // return;

    // if (nftData.transfer) {
    //   axios({
    //     method: "POST",
    //     url: "https://loud-backend.herokuapp.com/start_nft_sale",
    //     data: {
    //       tokenId: window.location.href.split("/").pop(),
    //       user: currentAccount,
    //       initialPrice: initialPrice,
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res, "this is res");
    //       setLoading(false);
    //       toast.success("Sale Started", {
    //         position: toast.POSITION.TOP_CENTER,
    //       });
    //       setStartSaleModal(false);
    //       setTimeout(() => {
    //         window.location.reload();
    //       }, 2000);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // } else {
    if (window.ethereum) {
      console.log("inisde here haha");
      await window.ethereum.send("eth_requestAccounts");
      window.web3 = new Web3(window.ethereum);
      // const accounts = await window.ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      const accounts = await window.web3.eth.getAccounts();

      window.contract = await new window.web3.eth.Contract(
        contractAbi,
        "0xE33DD0476E01975D184738eE5a8911e35b44631B"
      );

      const theOwner = await window.contract.methods
        .approve(
          "0x4E600a198Ed78A019E868b3A5a1cF149545bcEd5",
          window.location.href.split("/").pop()
        )
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {
          console.log(hash, "this is approve hash");
          axios({
            method: "POST",
            url: "https://loud-backend.herokuapp.com/start_nft_sale",
            data: {
              tokenId: window.location.href.split("/").pop(),
              user: currentAccount,
              initialPrice: initialPrice,
            },
          })
            .then((res) => {
              setLoading(false);
              toast.success("Sale Started", {
                position: toast.POSITION.TOP_CENTER,
              });
              setStartSaleModal(false);
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .on("error", (error) => {
          console.log(error);
          toast.error("Transaction Rejected", {
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
        });
      // }
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
          {/* start sale modal */}
          <Modal
            isOpen={startSaleModal}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={() => setModalOpen(false)}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {startSaleLoader ? (
              <center style={{ width: "32vw", height: "32vh" }}>
                <div class="fa-3x mt-5 pt-5">
                  <i class="fas fa-spinner fa-spin"></i>
                  <p>Please wait the transaction is being processed...</p>
                  <p>Do not refresh the page</p>
                </div>
              </center>
            ) : (
              <div style={{ width: "32vw", height: "32vh" }}>
                <div
                  style={{
                    fontSize: "28px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Start Sale </div>
                  <div
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => setStartSaleModal(false)}
                  >
                    x
                  </div>
                </div>
                <div>
                  <div></div>
                  <div className="pt-5">
                    {/* <label>
                      Enter Bid amount (Greater than current bidding amount)
                    </label> */}
                    Instant Sale Price:
                    <input
                      onChange={(e) => setInitialPrice(e.target.value)}
                      placeholder="Item Price In LOUD"
                    />
                  </div>

                  <div
                    className="d-block btn btn-bordered-white mt-5"
                    onClick={() => startSale()}
                  >
                    Start Sale
                  </div>
                </div>
              </div>
            )}
          </Modal>

          {/* withdraw modal */}
          <Modal
            isOpen={withdrawModal}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={() => setModalOpen(false)}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {withdrawLoader ? (
              <center style={{ width: "32vw", height: "32vh" }}>
                <div class="fa-3x mt-5 pt-5">
                  <i class="fas fa-spinner fa-spin"></i>
                  <p>Please wait the transaction is being processed...</p>
                  <p>Do not refresh the page</p>
                </div>
              </center>
            ) : (
              <div style={{ width: "32vw", height: "22vh" }}>
                <div
                  style={{
                    fontSize: "28px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Withdraw </div>
                  <div
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => setBidModal(false)}
                  >
                    x
                  </div>
                </div>
                <div>
                  <div></div>
                  <div className="pt-5">
                    {/* <label>
                      Enter Bid amount (Greater than current bidding amount)
                    </label> */}
                    Withdraw Amount: {withdrawAmount + " BNB"}
                  </div>

                  <div
                    className="d-block btn btn-bordered-white mt-5"
                    onClick={() => withDraw()}
                  >
                    Withdraw
                  </div>
                </div>
              </div>
            )}
          </Modal>
          {/* bid modal */}
          <Modal
            isOpen={bidModal}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={() => setModalOpen(false)}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {bidLoader ? (
              <center style={{ width: "32vw", height: "32vh" }}>
                <div class="fa-3x mt-5 pt-5">
                  <i class="fas fa-spinner fa-spin"></i>
                  <p>Please wait the transaction is being processed...</p>
                  <p>Do not refresh the page</p>
                </div>
              </center>
            ) : (
              <div style={{ width: "32vw", height: "40vh" }}>
                <div
                  style={{
                    fontSize: "28px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Bid Now</div>
                  <div
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => setBidModal(false)}
                  >
                    x
                  </div>
                </div>
                <div>
                  <div>
                    <h4>
                      Current Highest Bid:{" "}
                      {auctionData
                        ? auctionData.highest_bid === ""
                          ? "0 BNB"
                          : auctionData.highest_bid + "BNB"
                        : ""}
                    </h4>
                  </div>
                  <div className="pt-3">
                    <label>
                      Enter Bid amount (Greater than current bidding amount and
                      greater than item price if no bids avaialble)
                    </label>
                    <input
                      placeholder="Ex: 0.1 BNB"
                      style={{ width: "100%", marginTop: "10px" }}
                      type="number"
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                  </div>

                  <div
                    className="d-block btn btn-bordered-white mt-3"
                    onClick={() => sendBid()}
                  >
                    Bid Now
                  </div>
                </div>
              </div>
            )}
          </Modal>

          {/* auction modal */}
          <Modal
            isOpen={auctionModal}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={() => setModalOpen(false)}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {auctionLoading ? (
              <center style={{ width: "32vw", height: "32vh" }}>
                <div class="fa-3x mt-5 pt-5">
                  <i class="fas fa-spinner fa-spin"></i>
                  <p>Please wait the transaction is being processed...</p>
                  <p>Do not refresh the page</p>
                </div>
              </center>
            ) : (
              <div style={{ width: "32vw", height: "32vh" }}>
                <div
                  style={{
                    fontSize: "28px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>Auction</div>
                  <div
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={() => setAuctionModal(false)}
                  >
                    x
                  </div>
                </div>
                <div>
                  <div className="pt-5">
                    <label>Enter Auction End Time(in hours)</label>
                    <input
                      placeholder="Ex: 5hrs"
                      style={{ width: "100%", marginTop: "10px" }}
                      type="number"
                      min="0"
                      onChange={(e) => setAuctionTime(e.target.value)}
                    />
                  </div>
                  <div
                    className="d-block btn btn-bordered-white mt-5"
                    onClick={() => startAuction()}
                  >
                    Start Auction
                  </div>
                </div>
              </div>
            )}
          </Modal>
          {/* this is buyModal */}
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
              <div style={{ width: "32vw", height: "32vh" }}>
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
                  <div className="pt-5 d-flex justify-content-between">
                    <div> Initial price:</div>
                    <div> {nftData.initial_price + "  LOUD"}</div>
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
                      {parseFloat(nftData.initial_price) + loudPrice} LOUD
                    </div>
                  </div>
                  <div
                    className="d-block btn btn-bordered-white mt-4"
                    onClick={() => buyNft()}
                  >
                    Buy
                  </div>
                </div>
              </div>
            )}
          </Modal>
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
          <Modal
            isOpen={transferModal}
            // onAfterOpen={afterOpenModal}
            onRequestClose={() => setModalOpen(false)}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div style={{ width: "32vw", height: "32vh" }}>
              {transferLoad ? (
                <div>
                  <center>
                    <div class="fa-3x mt-5 pt-5">
                      <i class="fas fa-spinner fa-spin"></i>
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
                  <div className="pt-5">Enter Transfer Address:</div>
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
                    {/* <li>
                      <a
                        id="nav-contact-tab"
                        data-toggle="pill"
                        href="#nav-contact"
                      >
                        <h5 className="m-0">{initData.tab_3}</h5>
                      </a>
                    </li> */}
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
                                    : item.selling_type !== "Auction"
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
                              ) : item.selling_type !== "Minting" ? (
                                <div>
                                  <p className="m-0">
                                    Nft Transfered from{" "}
                                    <a href={`/artist/${item.from}`}>
                                      <strong>
                                        {item.from.slice(0, 6) + "..."}
                                      </strong>
                                    </a>
                                    <br />
                                  </p>
                                </div>
                              ) : (
                                <p className="m-0">
                                  Token Minted by{" "}
                                  <a href={`/artist/${item.to}`}>
                                    <strong>
                                      {item.to.slice(0, 6) + "..."}
                                    </strong>
                                  </a>
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
                      <a href={`/artist/${nftData.owned_by}`}>
                        {" "}
                        <h6 className="ml-2">
                          {nftData.owned_by.slice(0, 8) + "..."}
                        </h6>
                      </a>
                    </a>
                  </div>
                  {/* Item Info List */}
                  <div className="item-info-list mt-4">
                    <ul className="list-unstyled">
                      <li className="price d-flex justify-content-between">
                        <span>
                          Current Price {nftData.initial_price + " LOUD"}
                        </span>
                        {/* <span>{initData.price_2}</span>
                        <span>{initData.count}</span> */}
                      </li>
                      <li>
                        {/* <span>Size </span>
                        <span>{initData.size}</span> */}
                      </li>
                      <li>
                        {/* <span>Volume Traded </span>
                        <span>{initData.volume}</span> */}
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
                          {pendingReturn > 0 && (
                            <div
                              className="d-block btn btn-bordered-white ml-5"
                              onClick={() => openWithdraw()}
                            >
                              Withdraw
                            </div>
                          )}

                          {/* <a href="/author">
                            <img
                              className="avatar-md rounded-circle"
                              src={
                                nftData.creator_image === ""
                                  ? "data:image/jpeg;base64,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"
                                  : nftData.creator_image
                              }
                              alt=""
                            />
                          </a> */}
                          {/* Seller Info */}
                          {/* <div className="seller-info ml-3">
                            <a className="seller mb-2" href="/author">
                              {nftData.created_by.slice(0, 6) + ".."}
                            </a>
                        
                          </div> */}
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
                      <div>
                        {Date.now() + auctionTime < Date.now() ? (
                          <div
                            className="d-block btn btn-bordered-white mt-4"
                            onClick={() => endAuction()}
                          >
                            End auction
                          </div>
                        ) : (
                          <div
                            className="d-block btn btn-bordered-white mt-4"
                            onClick={() => endAuction()}
                          >
                            Stop auction
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div
                          className="d-block btn btn-bordered-white mt-4"
                          onClick={() => setAuctionModal(true)}
                        >
                          Start Auction
                        </div>
                      </div>
                    )
                  ) : nftData.on_auction ? (
                    <div>
                      {Date.now() + auctionTime < Date.now() ? (
                        ""
                      ) : (
                        <div
                          className="d-block btn btn-bordered-white mt-4"
                          onClick={() => setBidModal(true)}
                        >
                          Place a bid
                        </div>
                      )}
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
                          onClick={() => setStartSaleModal(true)}
                        >
                          Start Sale
                        </div>
                      </div>
                    )
                  ) : nftData.on_sale && account ? (
                    <div>
                      <div
                        className="d-block btn btn-bordered-white mt-4"
                        onClick={() => setBuyModal(true)}
                      >
                        Buy Now
                      </div>
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
