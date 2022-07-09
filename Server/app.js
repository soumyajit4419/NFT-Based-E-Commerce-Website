const dotenv = require("dotenv");
dotenv.config();

var express = require("express");
const app = express();
const bodyParser = require("body-parser");
var uniqid = require("uniqid");
var cors = require("cors");
const path = require("path");
const multer = require("multer");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const mongoConnect = require("./util/database");
app.use(express.urlencoded({ extended: false }));
const fs = require("fs");
const ciqlJson = require("ciql-json");
const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretApiKey = process.env.PINATA_SECRET_KEY;
const Web3 = require("web3");
const abiDecoder = require("abi-decoder");
const Nft = require("./models/Nft");
const Auction = require("./models/Auction");
const Wallet = require("./models/Wallet");
const Collectible = require("./models/Collectible");
const Activity = require("./models/Activity");
const Contract = require("./contractAbi");
const MyAuction = require("./auctionAbi");

/*
CONNECTING RPC NODE BSC-TESTNET (CHANGE FOR MAINNET)
*/

const web3 = new Web3(
  process.env.RPC_NODE ||
    "https://speedy-nodes-nyc.moralis.io/58179be7c4a9b63cf4bac6a5/bsc/testnet"
);

const User = require("./models/User");

const axios = require("axios");

const FormData = require("form-data");
const { findOneAndUpdate } = require("./models/Auction");
app.use(express.json());

app.use(cors());

///////////////////////////////////// IMPORTANT APIS ////////////////////////////

/*
TO PIN FILE TO IPFS AND GET FILE HASH
*/

const pinFileToIPFS = async (myFilePath) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let data = new FormData();
  data.append("file", fs.createReadStream(myFilePath));
  const res = await axios.post(url, data, {
    maxContentLength: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey,
    },
  });

  return res.data.IpfsHash;
};

/*
TO PIN METADATA TO IPFS  AND GET FILE HASH
*/

const pinDataToIPFS = async () => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let data = new FormData();
  data.append("file", fs.createReadStream("./data.json"));
  const res = await axios.post(url, data, {
    maxContentLength: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey,
    },
  });

  return res.data.IpfsHash;
};

/*
MAIN USER ROUTES
*/

app.use(userRoutes);

app.get("/", (req, res) => {
  res.send("hello world!");
});

/////////////////////////////////// FILE UPLOADER //////////////////////////////////

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
}).single("myImage");

app.post("/upload", async (req, res, err) => {
  let myPath;
  upload(req, res, (err) => {
    console.log("Request file ---", req.file);
    myPath = `./public/uploads/${req.file.filename}`;

    res.status(201).json(myPath);
  });
});

/////////////////////////////////// END FILE UPLOADER //////////////////////////////////

/*
METADATA CREATION API
*/

app.post("/create_meta_data", async (req, res, next) => {
  const imagePath = req.body.imagePath;
  const imageHash = await pinFileToIPFS(imagePath);

  ciqlJson
    .open("./data.json")
    .set("image", `https://ipfs.io/ipfs/${imageHash}`)
    .set("name", req.body.name)
    .set("by", req.body.creator)
    .set("description", req.body.description)
    .set("hash", imageHash)
    .set("cover", req.body.cover)
    .set("type", "Music")
    .save();

  const metaDataHash = await pinDataToIPFS();

  const metaDataURI = `https://ipfs.io/ipfs/${metaDataHash}`;

  fs.unlink(imagePath, (err) => {
    if (err) {
      console.log(err, "error");
      return;
    }
  });

  res.status(201).json({
    metaDataURI: metaDataURI,
    imageHash: imageHash,
  });
});

/*TRANSFER TOKEN*/

app.post("/change_check", async (req, res, next) => {
  const networkId = await web3.eth.net.getId();
  const account = web3.eth.accounts.wallet.add(
    process.env.ADMIN_WALLET_PRIVATE_KEY
  );

  const myContract = new web3.eth.Contract(
    Contract.contractAbi,
    "0xC27CA64B9E42b60cf92AA365457d3d9DB214566C"
  );

  console.log(account);
  const totalWei = parseFloat(req.body.initial_price) * 1000000000000000000;

  web3.eth
    .sendTransaction({
      from: account.address,
      to: req.body.fromAddress,
      value: totalWei.toString(),
      gas: 470000,
    })
    .on("transactionHash", function (hash) {
      console.log(hash, "money Transfer");
    });
});

/*END  AUCTION*/

app.post("/end_auction", async (req, res, next) => {
  console.log(req.body, "this is reqBody");
  const networkId = await web3.eth.net.getId();

  const account = web3.eth.accounts.wallet.add(
    process.env.ADMIN_WALLET_PRIVATE_KEY
  );

  const myContract = new web3.eth.Contract(
    MyAuction.auctionAbi,
    req.body.auctionAddress
  );

  const nftContract = new web3.eth.Contract(
    Contract.contractAbi,
    "0xC27CA64B9E42b60cf92AA365457d3d9DB214566C"
  );

  const newItem = web3.utils.toWei(req.body.highestBid.toString(), "ether");

  if (req.body.highestBid === "0") {
    const nftAuctionUpdate = await Auction.findOneAndUpdate(
      { contract_address: `${req.body.auctionAddress}` },
      {
        $set: {
          winner: "NO BIDS",
          highest_bid: "NO BIDS",
          status: "ended",
        },
      },
      { new: true, useFindAndModify: false }
    );

    const nftUpdate = await Nft.findOneAndUpdate(
      { token_id: `${req.body.tokenId}` },
      {
        $set: {
          on_auction: false,

          auction_end_time: "",
          auction_address: "",
        },
      },
      { new: true, useFindAndModify: false }
    );

    res.status(201).json({
      nft: nftUpdate,
    });
  }
  const fees = parseFloat(req.body.highestBid) / 10;
  console.log(fees, "fees");
  const totalWei = parseFloat(req.body.highestBid) - fees;

  console.log(totalWei, "total wei");

  const tx = await nftContract.methods
    .transferFrom(
      req.body.auctionCreator,
      req.body.highestBidder,
      req.body.tokenId
    )
    .send({ from: account.address, gas: 4700000 })
    .on("transactionHash", async function (hash) {
      console.log("transactionHash of transfer", hash);
    })
    .on("receipt", async function (receipt) {
      console.log(receipt, "receipt");
      const nftAuctionUpdate = await Auction.findOneAndUpdate(
        { contract_address: `${req.body.auctionAddress}` },
        {
          $set: {
            winner: req.body.highestBidder,
            highest_bid: req.body.highestBid,
            status: "ended",
          },
        },
        { new: true, useFindAndModify: false }
      );

      console.log("this is auc updt", nftAuctionUpdate);

      const nftBidderUpdate = await Auction.findOneAndUpdate(
        {
          contract_address: `${req.body.auctionAddress}`,
          "bidders.bidder_address": `${req.body.highestBidder.toLowerCase()}`,
        },
        {
          $set: {
            "bidders.$.auction_winner": true,
            "bidders.$.withdraw": true,
          },
        }
      );

      console.log(nftBidderUpdate, "updated nft Auction");

      const nftUpdate = await Nft.findOneAndUpdate(
        { token_id: `${req.body.tokenId}` },
        {
          $set: {
            owned_by: req.body.highestBidder,
            on_auction: false,
            transfer: false,
            auction_end_time: "",
          },
        },
        { new: true, useFindAndModify: false }
      );

      console.log(nftUpdate, "updated nft");

      let newTx = {
        from: req.body.creatorAddress,
        to: req.body.highestBidder,
        tx_hash: receipt.transactionHash,
        sold_for: req.body.highestBid,
        selling_type: "auction",
      };
      const nft = await Nft.findOneAndUpdate(
        { token_id: `${req.body.tokenId}` },
        {
          $push: {
            tx_history: newTx,
          },
        },
        { new: true, useFindAndModify: false }
      );

      console.log(nft, "nftmessage");
      console.log(account.address, "this is account address");
      console.log(req.body.auctionCreator, "this is creator!");

      const sendMoney = await web3.eth
        .sendTransaction({
          from: account.address,
          to: req.body.auctionCreator,
          value: totalWei.toString(),
          gas: 4700000,
        })
        .on("transactionHash", function (hash) {
          console.log(hash, "money Transfer");
          res.status(201).json({
            nft: nft,
          });
        });
    });

  console.log("updated nft");
});

app.post("/transfer_collectible", async (req, res, next) => {
  const networkId = await web3.eth.net.getId();

  const account = web3.eth.accounts.wallet.add(
    process.env.ADMIN_WALLET_PRIVATE_KEY
  );
  const myContract = new web3.eth.Contract(
    Contract.multipleAbi,
    "0xbDE308C9AdEc3E1216fc4d1139d8810903B32FC2"
  );

  var totalWei =
    (parseFloat(req.body.itemPrice) * parseFloat(req.body.quantity)).toFixed(
      3
    ) * 1000000000000000000;

  console.log(totalWei, "this is totalWei");

  web3.eth
    .sendTransaction({
      from: account.address,
      to: req.body.fromAddress,
      value: totalWei.toString(),
      gas: 1000000,
    })
    .on("transactionHash", function (hash) {
      console.log(hash, "money Transfer");
    })
    .on("receipt", async function (receipt) {
      console.log(receipt, "this is receipt");
      const tx = await myContract.methods
        .safeTransferFrom(
          account.address,
          req.body.toAddress,
          req.body.tokenId,
          req.body.quantity,
          req.body.toAddress
        )
        .send({ from: account.address, gas: 1000000 })
        .on("transactionHash", async function (hash) {
          console.log(hash, "this is another hash");
          const newDate = new Date();

          let newQuantity =
            parseInt(req.body.totalQuantity) - parseInt(req.body.quantity);

          const updatedCollectible = await Collectible.findOneAndUpdate(
            {
              token_id: `${req.body.tokenId}`,
            },
            {
              $set: {
                quantity: newQuantity,
              },
              $push: {
                ownerships: {
                  quantity: req.body.quantity,
                  owner: req.body.toAddress,
                  transfer_date: newDate.toString(),
                },
                tx_history: {
                  from: req.body.fromAddress,
                  to: req.body.toAddress,
                  tx_hash: req.body.txHash,
                  selling_type: "Transfer",
                  quantity: req.body.quantity,
                },
              },
            },
            { new: true, useFindAndModify: false }
          );

          const newActivity = {
            type: "Buy",
            date: newDate.toString(),
            by: req.body.fromAddress,
            image: req.body.coverImage,
            to: req.body.toAddress,
            amount: totalWei,
            name: updatedCollectible.name,
            url: `/collectibles/${updatedCollectible.tokenId}`,
            tx_hash: req.body.txHash,
          };

          const createdActivity = new Activity(newActivity);
          const savedActivity = await createdActivity.save();

          const updateFromUser = await User.findOneAndUpdate(
            {
              wallet_address: `${req.body.fromAddress.toLowerCase()}`,
              "collectibles.token_id": `${req.body.tokenId}`,
            },
            {
              $set: {
                "collectibles.$.quantity": newQuantity,
              },
            },
            { new: true, useFindAndModify: false }
          );

          const updateToUser = await User.findOneAndUpdate(
            {
              wallet_address: `${req.body.toAddress.toLowerCase()}`,
            },
            {
              $push: {
                collectibles: {
                  token_id: req.body.tokenId,
                  tx_hash: req.body.txHash,
                  item_price: req.body.itemPrice,
                  on_sale: false,
                  cover_image: req.body.coverImage,
                  name: req.body.name,
                  quantity: req.body.quantity,
                },
              },
            },
            { new: true, useFindAndModify: false }
          );
          res.json("success");
        });
    });
});

app.post("/transfer_nft", async (req, res, next) => {
  const networkId = await web3.eth.net.getId();
  const newDate = new Date();

  const account = web3.eth.accounts.wallet.add(
    process.env.ADMIN_WALLET_PRIVATE_KEY ||
      "7dab73e7972809180de4c0fece05f1a1fc01eed41e6267f2946e846690371a88"
  );
  const myContract = new web3.eth.Contract(
    Contract.contractAbi,
    "0xC27CA64B9E42b60cf92AA365457d3d9DB214566C"
  );

  var totalWei = parseFloat(req.body.initial_price) * 1000000000000000000;
  console.log(totalWei, "this is totalWei");

  const royalty =
    (parseFloat(req.body.initial_price) / parseFloat(req.body.royalty)).toFixed(
      4
    ) * 1000000000000000000;

  if (req.body.owner !== req.body.creator) {
    console.log(royalty);
    const sendRoyalty = await web3.eth.sendTransaction({
      from: account.address,
      to: req.body.creator,
      value: royalty.toString(),
      gas: 1000000,
    });

    console.log(sendRoyalty);
    totalWei = totalWei - royalty;
    console.log(totalWei, "after sending Royalty");
  }
  web3.eth
    .sendTransaction({
      from: account.address,
      to: req.body.fromAddress,
      value: totalWei.toString(),
      gas: 1000000,
    })
    .on("transactionHash", function (hash) {
      console.log(hash, "money Transfer");
    })
    .on("receipt", async function (receiptmain) {
      console.log("receipt main", receiptmain);
      const tx = await myContract.methods
        .transferFrom(
          req.body.fromAddress,
          req.body.toAddress,
          req.body.tokenId
        )
        .send({ from: account.address, gas: 1000000 })
        .on("transactionHash", async function (hash) {
          console.log(hash, "this is hash");
        })
        .on("receipt", async function (receipt) {
          console.log(receipt, "this is hash two");

          let newTx = {
            from: req.body.fromAddress.toLowerCase(),
            to: req.body.toAddress.toLowerCase(),
            tx_hash: receipt.transactionHash,
            sold_for: req.body.initial_price,
            selling_type: "purchase",
          };

          let newNft = {
            token_id: req.body.tokenId,
            tx_hash: receipt.transactionHash,
            creator: req.body.creator.toLowerCase(),
            owner: req.body.toAddress.toLowerCase(),
            on_sale: false,
            initial_price: "",
            music: req.body.music,
            cover_image: req.body.cover_image,
          };

          const updateNft = await Nft.findOneAndUpdate(
            { token_id: `${req.body.tokenId}` },
            {
              $set: {
                owned_by: req.body.toAddress.toLowerCase(),
                on_sale: false,
              },
            },
            { new: true, useFindAndModify: false }
          );

          console.log(updateNft, "its here");

          const nft = await Nft.findOneAndUpdate(
            { token_id: `${req.body.tokenId}` },
            {
              $push: {
                tx_history: newTx,
              },
            },
            { new: true, useFindAndModify: false }
          );

          console.log(nft, "pushed history in nft");

          let fromActivity = {
            activity_type: "token_sale",
            date: newDate.toString(),
            tx_hash: receipt.transactionHash,
            token_id: req.body.tokenId,
            to_address: req.body.toAddress.toLowerCase(),
          };

          let toActivity = {
            activity_type: "token_buy",
            date: newDate.toString(),
            tx_hash: receipt.transactionHash,
            token_id: req.body.tokenId,
            from_address: req.body.fromAddress.toLowerCase(),
          };

          const fromAddress = await User.findOneAndUpdate(
            { wallet_address: `${req.body.fromAddress.toLowerCase()}` },
            {
              $push: {
                activity: fromActivity,
              },
            },
            { new: true, useFindAndModify: false }
          );

          console.log(fromAddress, "updated from Address activity");

          const toAddressNft = await User.findOneAndUpdate(
            {
              wallet_address: `${req.body.toAddress.toLowerCase()}`,
            },
            {
              $push: {
                nfts: newNft,
              },
            },
            { new: true, useFindAndModify: false }
          );

          console.log(toAddressNft, "updated  toAddressNft");

          const toAddress = await User.findOneAndUpdate(
            { wallet_address: `${req.body.toAddress.toLowerCase()}` },
            {
              $push: {
                activity: toActivity,
              },
            },
            { new: true, useFindAndModify: false }
          );

          console.log(toAddress, "updated  to address activity");

          const updateNftOfFromAddress = await User.updateOne(
            {
              wallet_address: `${req.body.fromAddress.toLowerCase()}`,
              "nfts.token_id": `${req.body.tokenId}`,
            },
            {
              $set: {
                "nfts.$.owner": req.body.toAddress,
                "nfts.$.on_sale": false,
              },
            }
          );

          console.log(updateNftOfFromAddress, "updated iniside from address");

          const nftOwnerUpdate = await Nft.findOneAndUpdate(
            { token_id: `${req.body.tokenId}` },
            {
              $set: {
                owned_by: req.body.toAddress,
                on_sale: false,
                initial_price: "",
              },
            },
            { new: true, useFindAndModify: false }
          );

          const newActivity = {
            type: "Buy",
            date: newDate.toString(),
            by: req.body.fromAddress.toLowerCase(),
            image: req.body.cover_image,
            to: req.body.toAddress,
            amount: req.body.initial_price,
            name: nftOwnerUpdate.name,
            url: `/item-details/${nftOwnerUpdate.token_id}`,
            tx_hash: receipt.transactionHash,
          };

          const createdActivity = new Activity(newActivity);
          const savedActivity = await createdActivity.save();

          console.log(nftOwnerUpdate, "updated nft owner");

          res.send("success");
        });
    });
});

/*
 CONNECT TO MONGODB
*/

app.use(adminRoutes);

mongoConnect((res) => {
  console.log("connection successfull!!!");
  app.listen(process.env.PORT || 5000);
});
