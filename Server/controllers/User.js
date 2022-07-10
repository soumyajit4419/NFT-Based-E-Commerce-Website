const dotenv = require("dotenv");
dotenv.config();
const user_model = require("../models/user");

const _ = require("lodash");

const Web3 = require("web3");

const axios = require("axios");

const web3 = new Web3(process.env.RPC_NODE);

exports.newuser = async (req, res) => {
  try {
    // console.log(req.body.user);
    const userexist = await user_model.find({
      wallet_address: `${req.body.user.toLowerCase()}`
    });

    if (userexist.length !== 0) {
      res.json("User Already exists!");
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
      name: req.body.name,
      email: req.body.email,
      image: req.body.profileImage,
      wallet_address: req.body.user.toLowerCase(),
      blockchain: "ROPSTEN TESTNET"
    };

    const createdUser = new User(newUser);
    const savedUser = await createdUser.save();

    res.status(200).json({
      message: "New User Saved Successfully",
      user: savedUser.wallet_address,
      blockchain: savedUser.blockchain,
      profile_image: savedUser.profile_image
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.udpdateuserinfo = async (req, res, next) => {
  try {
    // console.log(req.body);

    const olduser = await user_model.find({
      wallet_address: `${req.body.user.toLowerCase()}`
    });

    const updateduser = await User.findOneAndUpdate(
      {
        wallet_address: `${req.body.user.toLowerCase()}`
      },
      {
        image:
          req.body.profileImage !== ""
            ? req.body.profileImage
            : olduser.image
            ? olduser.image
            : "",
        name: req.body.name ? req.body.name : olduser.name ? olduser.name : "",
        email: req.body.email
          ? req.body.email
          : olduser.email
          ? olduser.email
          : ""
      },
      { new: false, useFindAndModify: false }
    );
    res.status(200).json({
      message: "User details updated Sucessfully",
      user: updateduser
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

// exports.checkUser = async (req, res, next) => {
//   console.log(req.body);
//   const userExist = await User.find({
//     wallet_address: `${req.body.user.toLowerCase()}`
//   });

//   const isIp = await Iptracker.find({
//     wallet_address: `${req.body.user.toLowerCase()}`
//   });

//   console.log(isIp, "this is ip");
//   const newDate = new Date();

//   if (isIp.length === 0) {
//     console.log("iniside here");
//     const newIp = {
//       wallet_address: req.body.user.toLowerCase(),
//       ip_lists: [
//         {
//           ip_address: req.body.ip_address,
//           last_login: newDate.toString(),
//           is_blocked: false
//         }
//       ]
//     };

//     const createdIPtracker = new Iptracker(newIp);
//     const savedIptracker = await createdIPtracker.save();
//   } else {
//     const findIp = await Iptracker.find({
//       wallet_address: `${req.body.user.toLowerCase()}`,
//       "ip_lists.ip_address": `${req.body.ip_address}`
//     });

//     // console.log(findIp[0], "this is find Ip");

//     if (findIp.length === 0) {
//       const updateIpTracker = await Iptracker.findOneAndUpdate(
//         {
//           wallet_address: `${req.body.user.toLowerCase()}`
//         },
//         {
//           $push: {
//             ip_lists: {
//               ip_address: req.body.ip_address,
//               is_blocked: false,
//               last_login: newDate.toString()
//             }
//           }
//         },
//         { new: true, useFindAndModify: false }
//       );
//     } else {
//       const blockedIndex = await _.findIndex(findIp[0].ip_lists, {
//         ip_address: req.body.ip_address
//       });

//       console.log(blockedIndex, "this is it");

//       if (findIp[0].ip_lists[blockedIndex].is_blocked) {
//         res.json({
//           message: "blocked"
//         });
//         return;
//       }
//     }
//   }

//   if (userExist.length !== 0) {
//     if (userExist[0].is_blocked) {
//       res.json({
//         message: "blocked"
//       });
//     } else {
//       res.json({
//         message: "user exist",
//         address: userExist[0].wallet_address,
//         profile_image: userExist[0].profile_image
//       });
//       return;
//     }
//   } else {
//     res.json({
//       message: "notfound"
//     });
//     return;
//   }
// };

// exports.startAuciton = async (req, res, next) => {};

// exports.updateProfileImage = async (req, res, next) => {
//   const userExist = await User.findOneAndUpdate(
//     {
//       wallet_address: `${req.body.user.toLowerCase()}`
//     },
//     {
//       profile_image: req.body.profileImage
//     },
//     { new: false, useFindAndModify: false }
//   );

//   res.json("success");
// };

// exports.getUserDetails = async (req, res, next) => {
//   console.log(req.body);
//   const userExist = await User.find({
//     wallet_address: `${req.body.user.toLowerCase()}`
//   });

//   if (userExist.length === 0) {
//     res.json("some Error occurred");
//     return;
//   }

//   res.json(userExist[0]);
// };

// exports.getCollectibles = async (req, res, next) => {
//   const topCollectibles = await Collectible.find()
//     .sort({ $natural: -1 })
//     .limit(8);

//   res.json({
//     collectible: topCollectibles
//   });
// };

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

// exports.getCollectibleInfo = async (req, res, next) => {
//   console.log(req.body);
//   const collectible = await Collectible.find({
//     token_id: `${req.body.tokenId}`
//   });

//   console.log(collectible[0], "this is it");

//   res.json({
//     collectible: collectible[0]
//   });
// };
