const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/User");
const Collectible = require("../models/Collectible");
const Nft = require("../models/Nft");
const Auction = require("../models/Auction");
const Wallet = require("../models/Wallet");
const Activity = require("../models/Activity");
const Iptracker = require("../models/Iptracker");

const _ = require("lodash");

const Web3 = require("web3");

const axios = require("axios");

const web3 = new Web3(process.env.RPC_NODE);

exports.checkUser = async (req, res, next) => {
  console.log(req.body);
  const userExist = await User.find({
    wallet_address: `${req.body.user.toLowerCase()}`,
  });

  const isIp = await Iptracker.find({
    wallet_address: `${req.body.user.toLowerCase()}`,
  });

  console.log(isIp, "this is ip");
  const newDate = new Date();

  if (isIp.length === 0) {
    console.log("iniside here");
    const newIp = {
      wallet_address: req.body.user.toLowerCase(),
      ip_lists: [
        {
          ip_address: req.body.ip_address,
          last_login: newDate.toString(),
          is_blocked: false,
        },
      ],
    };

    const createdIPtracker = new Iptracker(newIp);
    const savedIptracker = await createdIPtracker.save();
  } else {
    const findIp = await Iptracker.find({
      wallet_address: `${req.body.user.toLowerCase()}`,
      "ip_lists.ip_address": `${req.body.ip_address}`,
    });

    // console.log(findIp[0], "this is find Ip");

    if (findIp.length === 0) {
      const updateIpTracker = await Iptracker.findOneAndUpdate(
        {
          wallet_address: `${req.body.user.toLowerCase()}`,
        },
        {
          $push: {
            ip_lists: {
              ip_address: req.body.ip_address,
              is_blocked: false,
              last_login: newDate.toString(),
            },
          },
        },
        { new: true, useFindAndModify: false }
      );
    } else {
      const blockedIndex = await _.findIndex(findIp[0].ip_lists, {
        ip_address: req.body.ip_address,
      });

      console.log(blockedIndex, "this is it");

      if (findIp[0].ip_lists[blockedIndex].is_blocked) {
        res.json({
          message: "blocked",
        });
        return;
      }
    }
  }

  if (userExist.length !== 0) {
    if (userExist[0].is_blocked) {
      res.json({
        message: "blocked",
      });
    } else {
      res.json({
        message: "user exist",
        address: userExist[0].wallet_address,
        profile_image: userExist[0].profile_image,
      });
      return;
    }
  } else {
    res.json({
      message: "notfound",
    });
    return;
  }
};

exports.updateUserInfo = async (req, res, next) => {
  console.log(req.body);

  const oldUser = await User.find({
    wallet_address: `${req.body.user.toLowerCase()}`,
  });

  const updatedUser = await User.findOneAndUpdate(
    {
      wallet_address: `${req.body.user.toLowerCase()}`,
    },
    {
      profile_image:
        req.body.profileImage !== ""
          ? req.body.profileImage
          : oldUser.profileImage
          ? oldUser.profileImage
          : "",
      profile_name: req.body.profileName
        ? req.body.profileName
        : oldUser.profile_name
        ? oldUser.profile_name
        : "",
      bio: req.body.bio ? req.body.bio : oldUser.bio ? oldUser.bio : "",
      email: req.body.email
        ? req.body.email
        : oldUser.email
        ? oldUserEmail
        : "",
      instagram: req.body.instagram
        ? req.body.instagram
        : oldUser.instagram
        ? oldUser.instagram
        : "",
      facebook: req.body.facebook
        ? req.body.facebook
        : oldUser.facebook
        ? oldUser.facebook
        : "",
      telegram: req.body.telegram
        ? req.body.telegram
        : oldUser.telegram
        ? oldUser.telegram
        : "",
      twitter: req.body.twitter
        ? req.body.twitter
        : oldUser.twitter
        ? oldUser.twitter
        : "",
    },
    { new: false, useFindAndModify: false }
  );

  res.json(oldUser);
};

exports.updateMany = async (req, res, next) => {
  const updates = await User.updateMany({}, { $set: { is_blocked: false } });
  res.send("success");
};

exports.getMoreNft = async (req, res, next) => {
  const moreNft = await Nft.find().sort({ $natural: -1 }).limit(100);

  res.json({
    nfts: moreNft,
  });
};
exports.getMoreAuction = async (req, res, next) => {
  // const topSale = await Nft.find({ on_sale: true })
  //   .sort({ $natural: -1 })
  //   .limit(6);
  const moreAuction = await Nft.find({ on_auction: true })
    .sort({ $natural: -1 })
    .limit(100);

  res.json({
    auctions: moreAuction,
  });
};

exports.getSearch = async (req, res, next) => {
  console.log(req.body);
  res.json({
    url: "https://loud-test-1463c.web.app/featured ",
  });
};

exports.getMoreUsers = async (req, res, next) => {
  const topUsers = await User.find()
    .sort({ $natural: -1 })
    .select("wallet_address")
    .select("profile_image")
    .select("profile_name")
    .select("is_verified")
    .limit(100);
  res.json({
    topUsers: topUsers,
  });
};

exports.getMoreCollectibles = async (req, res, next) => {
  const moreCollectible = await Collectible.find()
    .sort({ $natural: -1 })
    .limit(100);
  res.json({
    collectibles: moreCollectible,
  });
};
exports.startAuciton = async (req, res, next) => {};

exports.updateProfileImage = async (req, res, next) => {
  const userExist = await User.findOneAndUpdate(
    {
      wallet_address: `${req.body.user.toLowerCase()}`,
    },
    {
      profile_image: req.body.profileImage,
    },
    { new: false, useFindAndModify: false }
  );

  res.json("success");
};

exports.getUserDetails = async (req, res, next) => {
  console.log(req.body);
  const userExist = await User.find({
    wallet_address: `${req.body.user.toLowerCase()}`,
  });

  if (userExist.length === 0) {
    res.json("some Error occurred");
    return;
  }

  res.json(userExist[0]);
};

exports.getTopUsers = async (req, res, next) => {
  console.log("this is it");
  const topUsers = await User.find({ is_verified: true })
    .select("wallet_address")
    .select("profile_image")
    .select("profile_name")
    .select("is_verified")
    .sort({ $natural: -1 })
    .limit(6);

  console.log(topUsers, "this is it");
  if (topUsers.length === 0) {
    res.json("some Error occurred");
    return;
  }
  res.json({
    topUsers: topUsers,
  });
};

exports.getCollectibles = async (req, res, next) => {
  const topCollectibles = await Collectible.find()
    .sort({ $natural: -1 })
    .limit(8);

  res.json({
    collectible: topCollectibles,
  });
};

exports.saveUser = async (req, res, next) => {
  console.log(req.body.user);
  const userExist = await User.find({
    wallet_address: `${req.body.user.toLowerCase()}`,
  });

  if (userExist.length !== 0) {
    res.json("user already exists!");
    return;
  }

  // var account = await web3.eth.accounts.create();

  // const newWallet = {
  //   address: account.address,
  //   private_key: account.privateKey,
  // };

  // const createdWallet = new Wallet(newWallet);
  // const savedWallet = await savedWallet.save();

  let newUser = {
    wallet_address: req.body.user.toLowerCase(),
    blockchain: "BSC TESTNET",
    collectibles: [],
    profile_name: req.body.profileName,
    bio: req.body.bio,
    instagram: req.body.instagram,
    email: req.body.email,
    facebook: req.body.facebook,
    twitter: req.body.twitter,
    telegram: req.body.telegram,
    nfts: [],
    profile_image: req.body.profileImage,
    following: [],
    followers: [],
  };

  const createdUser = new User(newUser);
  const savedUser = await createdUser.save();

  res.status(201).json({
    message: "success",
    user: savedUser.wallet_address,
    blockchain: savedUser.blockchain,
    collectibles: [],
    nfts: [],
    profile_image: savedUser.profile_image,
    following: [],
    following: [],
  });
};

// exports.getCollectibles = async (req, res, next) => {
//   const user = await User.find({
//     wallet_address: `${req.body.wallet_address}`,
//   });

//   if (user.length !== 0) {
//     res.status(201).json({
//       collectibles: user[0].collectibles,
//     });
//   } else {
//     res.status(201).json({
//       message: "user not found!",
//     });
//   }
// };

exports.getTokenInfo = async (req, res, next) => {
  const nft = await Nft.find({
    token_id: `${req.body.tokenId}`,
  });

  if (nft.length !== 0) {
    res.status(201).json({
      nft: nft[0],
    });
  } else {
    res.status(201).json({
      message: "nft not found!",
    });
  }
};

exports.addCollectibleInfo = async (req, res, next) => {
  let userAddr = req.body.owner;
  console.log(req.body, "this is req body!");
  let currentDate = new Date();
  let transfer;
  if (req.body.onSale) {
    transfer = true;
  } else {
    transfer = false;
  }

  const user = await User.find({
    wallet_address: req.body.owner,
  });

  if (user.length === 0) {
    const newUser = {
      wallet_address: req.body.owner,
      blockchain: "ropsten",
      multiple_transfer: transfer,
      collectibles: [
        {
          name: req.body.name,
          token_id: req.body.token_id,
          quantity: req.body.quantity,
          creator: req.body.owner,
          music: req.body.music,
          item_price: req.body.itemPrice,
          tx_hash: req.body.tx_hash,
          cover_image: req.body.coverImage,
          on_sale: req.body.onSale,
          on_auciton: false,
        },
      ],
    };
    res.send("success");
  } else {
    const updatedUser = await User.findOneAndUpdate(
      { wallet_address: `${req.body.owner.toLowerCase()}` },
      {
        $push: {
          collectibles: {
            token_id: req.body.tokenId,
            tx_hash: req.body.txHash,
            item_price: req.body.itemPrice,
            owned_by: req.body.owner,
            created_by: req.body.owner,
            quantity: req.body.quantity,
            on_sale: req.body.onSale,
            music: req.body.music,
            cover_image: req.body.coverImage,
            name: req.body.name,
            owner_image: req.body.ownerImage,
            creator_image: req.body.creatorImgae,
            transfer: transfer,
            music: req.body.music,
            royalty: req.body.royalty,
            date: currentDate.toString(),
            description: req.body.description,
          },
        },
        $set: {
          multiple_transfer: transfer,
        },
      },
      { new: true, useFindAndModify: false }
    );

    const updatedUserActivity = await User.findOneAndUpdate(
      { wallet_address: `${req.body.owner.toLowerCase()}` },
      {
        $push: {
          activity: {
            activity_type: "Minting Collectible",
            date: currentDate.toString(),
            by: req.body.owner.toLowerCase(),
          },
        },
      },
      { new: true, useFindAndModify: false }
    );

    const newCollectible = {
      token_id: req.body.tokenId,
      tx_hash: req.body.txHash,
      created_by: req.body.owner,
      owned_by: req.body.owner,
      quantity: req.body.quantity,
      uri: req.body.uri,
      trending: false,
      on_auction: false,
      on_sale: req.body.onSale,
      item_price: req.body.itemPrice,
      cover_image: req.body.coverImage,
      name: req.body.name,
      owner_image: req.body.ownerImage,
      creator_image: req.body.creatorImage,
      transfer: transfer,
      music: req.body.music,
      royalty: req.body.royalty,
      description: req.body.description,
      date: currentDate.toString(),
      tx_history: [
        {
          from: req.body.owner,
          to: req.body.owner,
          tx_hash: req.body.txHash,
          sold_for: "",
          selling_type: "Minting",
          quantity: req.body.quantity,
        },
      ],
      ownerships: [
        {
          quantity: req.body.quantity,
          owner: req.body.owner,
          transfer_date: currentDate.toString(),
          txHash: req.body.txHash,
        },
      ],
      auction_history: [],
    };
    const nftExist = await Collectible.find({
      token_id: `${req.body.tokenId}`,
    });

    if (nftExist.length !== 0) {
      res.json("user already exists!");
      return;
    }

    const createdCollectible = new Collectible(newCollectible);
    const savedCollectible = await createdCollectible.save();

    console.log(savedCollectible, "this si saved nft");

    const newActivity = {
      type: "Minting Collectible",
      date: currentDate.toString(),
      by: req.body.owner,
      by_name: req.body.name,
      image: req.body.coverImage,
      to: "Self",
      amount: "nil",
      url: `/collectibles/${savedCollectible.token_id}`,
      tx_hash: req.body.txHash,
    };

    const createdActivity = new Activity(newActivity);
    const savedActivity = await createdActivity.save();

    res.json({
      tokenId: savedCollectible.token_id,
    });
  }
};

exports.addTokenInfo = async (req, res, next) => {
  let userAddr = req.body.owner;
  console.log(req.body, "this is req body!");
  let currentDate = new Date();

  // return;
  let transfer;
  if (req.body.onSale) {
    transfer = true;
  } else {
    transfer = false;
  }

  const user = await User.find({
    wallet_address: req.body.owner,
  });

  if (user.length === 0) {
    const newUser = {
      wallet_address: req.body.owner,
      blockchain: "ropsten",
      nfts: [
        {
          token_id: req.body.tokenId,
          tx_hash: req.body.txHash,
        },
      ],
    };
    res.send("success");
  } else {
    const updatedUser = await User.findOneAndUpdate(
      { wallet_address: `${req.body.owner.toLowerCase()}` },
      {
        $push: {
          nfts: {
            token_id: req.body.tokenId,
            tx_hash: req.body.txHash,
            initial_price: req.body.initialPrice,
            owner: req.body.owner,
            creator: req.body.owner,
            on_sale: req.body.onSale,
            music: req.body.music,
            cover_image: req.body.coverImage,
            name: req.body.name,
            owner_image: req.body.ownerImage,
            creator_image: req.body.creatorImgae,
            transfer: req.body.transfer,
            music: req.body.music,
            royalty: req.body.royalty,

            date: currentDate.toString(),

            description: req.body.description,
          },
        },
      },
      { new: true, useFindAndModify: false }
    );

    const updatedUserActivity = await User.findOneAndUpdate(
      { wallet_address: `${req.body.owner.toLowerCase()}` },
      {
        $push: {
          activity: {
            activity_type: "Minting",
            date: currentDate.toString(),
            by: req.body.owner.toLowerCase(),
          },
        },
      },
      { new: true, useFindAndModify: false }
    );

    const newNft = {
      token_id: req.body.tokenId,
      tx_hash: req.body.txHash,
      created_by: req.body.owner,
      owned_by: req.body.owner,
      trending: false,
      on_auction: false,
      on_sale: req.body.onSale,
      initial_price: req.body.initialPrice,
      cover_image: req.body.coverImage,
      name: req.body.name,
      owner_image: req.body.ownerImage,
      creator_image: req.body.creatorImage,
      transfer: req.body.transfer,
      music: req.body.music,
      royalty: req.body.royalty,
      description: req.body.description,

      date: currentDate.toString(),
      tx_history: [
        {
          to: req.body.owner,
          selling_type: "Minting",
        },
      ],
    };
    const nftExist = await Nft.find({
      token_id: `${req.body.tokenId}`,
    });

    if (nftExist.length !== 0) {
      res.json("user already exists!");
      return;
    }

    const createdNft = new Nft(newNft);
    const savedNft = await createdNft.save();

    console.log(savedNft, "this si saved nft");

    const newActivity = {
      type: "Minting Token",
      date: currentDate.toString(),
      by: req.body.owner,
      by_name: req.body.name,
      image: req.body.coverImage,
      to: "Self",
      amount: "nil",
      url: `/item-details/${savedNft.token_id}`,
      tx_hash: req.body.txHash,
    };

    const createdActivity = new Activity(newActivity);
    const savedActivity = await createdActivity.save();
    console.log(savedActivity);
    res.json({
      tokenId: savedNft.token_id,
    });
  }
};

exports.createCollectibles = async (req, res, next) => {
  const low_wallet_address = req.body.wallet_address.toLowerCase();

  // console.log(low_contract_address, "low");
  const firstCollectible = {
    contract_address: req.body.contract_address,
    block_hash: req.body.blockHash,
    from: req.body.from,
    // block_number: req.body.blockNumber,
    transaction_hash: req.body.transactionHash,
    gas_used: req.body.gas_used,
  };

  // console.log("first newCollectible", firstCollectible);
  const user = await User.findOneAndUpdate(
    { wallet_address: `${low_wallet_address}` },
    {
      $push: {
        collectibles: firstCollectible,
      },
    },
    { new: true, useFindAndModify: false }
  );

  anothernewCollectible = {
    contract_address: req.body.contract_address,
    account: req.body.wallet_address,
    nfts: [],
  };

  const collectible = new Collectible(anothernewCollectible);
  const savedCollectible = await collectible.save();

  res.status(201).json({
    collectibles: user.collectibles,
    message: "success",
  });
};

exports.putOnSale = async (req, res, next) => {
  const updateNftOfFromAddress = await User.updateOne(
    {
      wallet_address: `${req.body.address.toLowerCase()}`,
      "nfts.token_id": `${req.body.tokenId}`,
    },
    {
      $set: {
        "nfts.$.initial_price": req.body.sellPrice,
        "nfts.$.on_sale": true,
        "nfts.$.transfer": true,
      },
    }
  );
  const nftUpdate = await Nft.findOneAndUpdate(
    { token_id: `${req.body.tokenId}` },
    {
      $set: {
        owned_by: req.body.toAddress,
        on_sale: true,
        initial_price: req.body.sellPrice,
        transfer: true,
      },
    },
    { new: true, useFindAndModify: false }
  );

  res.send("success");
};

exports.createAuction = async (req, res, next) => {
  const changeUserNft = await User.updateOne(
    {
      wallet_address: `${req.body.address.toLowerCase()}`,
      "nfts.token_id": `${req.body.tokenId}`,
    },
    {
      $set: {
        "nfts.$.auction_end_time": req.body.endTime,
        "nfts.$.on_auction": true,
        "nfts.$.auction_address": req.body.contractAddress,
        "nfts.$.on_sale:": false,
      },
    }
  );

  const newDate = new Date();

  const newAuction = {
    contract_address: req.body.contractAddress,
    creator: req.body.address,
    end_time: req.body.endTime,
    token_id: req.body.tokenId,
    highest_bid: "",
    highest_bidder: "",
    is_live: true,
    date: newDate.toString(),
    bidders: [],
  };

  const createdAuction = new Auction(newAuction);
  const savedAuction = await createdAuction.save();

  console.log(savedAuction, "saved Auction ");

  const nftUpdate = await Nft.findOneAndUpdate(
    { token_id: `${req.body.tokenId}` },
    {
      $set: {
        on_auction: true,
        on_sale: false,
        auction_end_time: req.body.endTime,
        auction_address: req.body.contractAddress,
        previous_auction: true,
      },
    },
    { new: true, useFindAndModify: false }
  );

  const newActivity = {
    type: "On Auction",
    date: newDate.toString(),
    by: nftUpdate.owned_by,
    by_name: "",
    to: "Self",
    amount: "nil",
    image: nftUpdate.cover_image,
    url: `/item-details/${nftUpdate.token_id}`,
    tx_hash: req.body.txHash,
  };

  const createdActivity = new Activity(newActivity);
  const savedActivity = await createdActivity.save();

  console.log(savedActivity);
  res.send("success");
};

exports.topNft = async (req, res, next) => {
  const newNft = await Nft.find().sort({ $natural: -1 }).limit(8);
  const topSale = await Nft.find({ on_sale: true })
    .sort({ $natural: -1 })
    .limit(6);
  const topAuction = await Nft.find({ on_auction: true })
    .sort({ $natural: -1 })
    .limit(6);
  // console.log(topSale);
  res.send({
    newNft: newNft,
    topSale: topSale,
    topAuction: topAuction,
  });
};

exports.createBid = async (req, res, next) => {
  console.log(req.body);
  const newDdate = new Date();
  const newBid = {
    bidder_address: req.body.from,
    amount: req.body.bidAmount,
    date: newDdate.toString(),
    withdraw: false,
    auction_winner: false,
  };

  const newAuction = await Auction.findOneAndUpdate(
    { contract_address: `${req.body.auction_address}` },
    {
      $push: {
        bidders: newBid,
      },
      $set: {
        highest_bid: req.body.bidAmount,
        highest_bidder: req.body.from,
      },
    },
    { new: true, useFindAndModify: false }
  );

  console.log(newAuction, "this is newAuction");

  const newActivity = {
    type: "Bid",
    date: newDdate.toString(),
    by: req.body.from,
    by_name: "",
    to: "",
    amount: req.body.bidAmount,
    url: `/item-details/${newAuction.token_id}`,
    tx_hash: req.body.txHash,
  };

  const createdActivity = new Activity(newActivity);
  const savedActivity = await createdActivity.save();

  console.log(savedActivity);

  res.send("success");
};

exports.getCollectibleInfo = async (req, res, next) => {
  console.log(req.body);
  const collectible = await Collectible.find({
    token_id: `${req.body.tokenId}`,
  });

  console.log(collectible[0], "this is it");

  res.json({
    collectible: collectible[0],
  });
};

exports.getAuctionInfo = async (req, res, next) => {
  console.log(req.body, "this is");
  const auction = await Auction.find({
    contract_address: `${req.body.auction_address}`,
  });
  res.json({
    auction: auction[0],
  });
};

exports.updateNftDetails = async (req, res, next) => {
  const updatedNft = await Nft.findOneAndUpdate(
    {
      token_id: `${req.body.tokenId}`,
    },
    {
      owned_by: req.body.newOwner,
    },
    { new: false, useFindAndModify: false }
  );

  const newDate = new Date();

  const newNftTx = {
    from: req.body.currentOwner,
    to: req.body.newOwner,
    date: newDate.toString(),
    tx_hash: req.body.txHash,
  };
  const nftTxUpdate = await Nft.findOneAndUpdate(
    { token_id: `${req.body.tokenId}` },
    {
      $push: {
        tx_history: newNftTx,
      },
    },
    { new: true, useFindAndModify: false }
  );

  console.log(nftTxUpdate, "this is nftTxUpdate");

  const updateNftOfFromAddress = await User.updateOne(
    {
      wallet_address: `${req.body.currentOwner.toLowerCase()}`,
      "nfts.token_id": `${req.body.tokenId}`,
    },
    {
      $set: {
        "nfts.$.owner": req.body.newOwner,
      },
    }
  );

  // const updateNftOfFromAddress = await User.updateOne(
  //   {
  //     wallet_address: `${req.body.currentOwner.toLowerCase()}`,
  //     "nfts.token_id": `${req.body.tokenId}`,
  //   },
  //   {
  //     $set: {
  //       "nfts.$.owned_by": req.body.newOwner,
  //     },
  //   }
  // );
  const updateNftOfToAddress = await User.findOneAndUpdate(
    { wallet_address: `${req.body.newOwner.toLowerCase()}` },
    {
      $push: {
        nfts: nftTxUpdate,
      },
    },
    { new: true, useFindAndModify: false }
  );
  ///addthis later
  const newActivityFrom = {};

  const newActivityTo = {};

  res.send("success");
};

exports.bidWithdraw = async (req, res) => {
  console.log(req.body);
  const updateNftOfFromAddress = await Auction.updateOne(
    {
      contract_address: `${req.body.auctionAddress}`,
      "bidders.bidder_address": `${req.body.user.toLowerCase()}`,
    },
    {
      $set: {
        "bidders.$.withdraw": true,
      },
    }
  );
  console.log(updateNftOfFromAddress, "this is it");
  const remaining = await Auction.find({
    contract_address: req.body.auctionAddress,
  });
  console.log(remaining[0]);
  var count = 0;

  const changeUser = async () => {
    for (let i = 0; i < remaining[0].bidders.length; i++) {
      if (!remaining[0].bidders[i].withdraw) {
        count++;
      }
    }

    return count;
  };

  const getCount = await changeUser();

  console.log(getCount);

  if (getCount === 0) {
    console.log("inisde here!");
    const remaing = await Nft.findOneAndUpdate(
      {
        auction_address: req.body.auctionAddress,
      },
      {
        $set: {
          auction_address: "",
        },
      }
    );

    res.send("success");
  } else {
    res.send("success");
  }

  console.log(remaining);
};

exports.sendEmail = async (req, res, next) => {
  function getRequestParams(email, name, subject, message) {
    const API_KEY = process.env.API_KEY;
    const LIST_ID = process.env.LIST_ID;

    const DATA_CENTER = process.env.DATA_CENTER;

    const url = `https://${DATA_CENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

    const data = {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        NAME: name,
        SUBJECT: subject,
        MESSAGE: message,
      },
    };

    const postData = JSON.stringify(data);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${"7c186d831f285d1eb0765660445135d0-us5"}`,
    };

    return {
      url,
      postData,
      headers,
    };
  }

  const { email, name, subject, message } = req.body;

  if (email === "" || name === "" || message === "" || subject === "") {
    return res.status(400).json({
      error: "some fields are missing",
    });
  }

  try {
    const { url, postData, headers } = getRequestParams(
      email,
      name,
      subject,
      message
    );

    const response = await axios.post(url, postData, { headers });

    return res.status(201).json({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Oops something went wrong",
    });
  }
};

exports.updateCollectible = async (req, res, next) => {
  console.log("body", req.body);
  const collectible = await Collectible.find({
    token_id: `${req.body.tokenId}`,
  });

  const newDate = new Date();

  let newQuantity =
    parseInt(collectible[0].quantity) - parseInt(req.body.transferQuantity);

  console.log(newQuantity);

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
          quantity: req.body.transferQuantity,
          owner: req.body.newOwner,
          transfer_date: newDate.toString(),
        },
        tx_history: {
          from: req.body.currentOwner,
          to: req.body.newOwner,
          tx_hash: req.body.txHash,
          selling_type: "Transfer",
          quantity: req.body.transferQuantity,
        },
      },
    },
    { new: true, useFindAndModify: false }
  );

  const newActivity = {
    type: "collectible transfer",
    date: newDate.toString(),
    by: req.body.currentOwner,
    cover_image: req.body.coverImage,
    to: req.body.newOwner,
    url: `/collectibles/${updatedCollectible.token_id}`,
    tx_hash: req.body.txHash,
  };

  const createdActivity = new Activity(newActivity);
  const savedActivity = await createdActivity.save();

  const updateFromUser = await User.findOneAndUpdate(
    {
      wallet_address: `${req.body.currentOwner.toLowerCase()}`,
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
      wallet_address: `${req.body.newOwner.toLowerCase()}`,
    },
    {
      $push: {
        collectibles: {
          token_id: req.body.tokenId,
          tx_hash: req.body.txHash,
          item_price: req.body.itemPrice,
          on_sale: req.body.onSale,
          cover_image: req.body.coverImage,
          name: req.body.name,
          quantity: req.body.transferQuantity,
        },
      },
    },
    { new: true, useFindAndModify: false }
  );

  res.send("success");
};

exports.stopNftSale = async (req, res, next) => {
  const updatNft = await Nft.findOneAndUpdate(
    {
      token_id: `${req.body.tokenId}`,
    },
    {
      $set: {
        on_sale: false,
        transfer: true,
      },
    },
    { new: true, useFindAndModify: false }
  );

  res.json("success");
};

exports.startNftSale = async (req, res, next) => {
  console.log(req.body, "this is req body!");
  const updatNft = await Nft.findOneAndUpdate(
    {
      token_id: `${req.body.tokenId}`,
    },
    {
      $set: {
        on_sale: true,
        transfer: true,
        initial_price: req.body.initialPrice,
      },
    },
    { new: true, useFindAndModify: false }
  );

  const updateUser = await User.findOneAndUpdate(
    {
      wallet_address: `${req.body.user.toLowerCase()}`,
      "nfts.token_id": `${req.body.tokenId}`,
    },
    {
      $set: {
        "nfts.$.initial_price": req.body.initialPrice,
        "nfts.$on_sale": true,
      },
    },
    { new: true, useFindAndModify: false }
  );

  console.log(updateUser, "this is update user");

  res.json("success");
};

exports.startCollectibleSale = async (req, res, next) => {
  console.log(req.body);
  const updateCollectible = await Collectible.findOneAndUpdate(
    {
      token_id: `${req.body.tokenId}`,
    },
    {
      $set: {
        on_sale: true,
      },
    },
    { new: true, useFindAndModify: false }
  );

  res.json("success");
};

exports.stopCollectibleSale = async (req, res, next) => {
  const updateCollectible = await Collectible.findOneAndUpdate(
    {
      token_id: `${req.body.tokenId}`,
    },
    {
      $set: {
        on_sale: false,
      },
    },
    { new: true, useFindAndModify: false }
  );

  res.json("success");
};

exports.getActivities = async (req, res, next) => {
  const oldActivity = await Activity.find().limit(20);
  const newActivity = await Activity.find().sort({ $natural: -1 }).limit(20);
  const purchase = await Activity.find({
    type: "Buy",
  }).limit(20);

  res.json({
    tabData_1: oldActivity,
    tabData_2: newActivity,
    tabData_3: purchase,
  });
};
