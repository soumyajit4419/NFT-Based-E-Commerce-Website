const User = require("../models/User");
const Admin = require("../models/Admin");
const Nft = require("../models/Nft");
const Collectible = require("../models/Collectible");
const Auction = require("../models/Auction");
const Activity = require("../models/Activity");
const Iptracker = require("../models/Iptracker");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error.js");
var uniqid = require("uniqid");
var speakeasy = require('speakeasy');
const adminActivity = require("../models/Adminactivity");
var ip  = require('ip');
var useragent = require('express-useragent');
const ipblock = require('../models/Ipblock');

const verify = (req) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //Authorization: "Bearer Token"
    if (!token) {
      const error = new HttpError("Authentication failed!", 401);
      return next(error);
    }

    const decodedToken = jwt.verify(token, "supersecret_of_loud_nft");
    req.userData = { userId: decodedToken.userId };

    return "success";
  } catch (err) {
    return "error";
  }
};

exports.getAllActivities = async (req, res, next) => {
  const check = await verify(req);
  if (check !== "success") {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  } else {
    const allActivity = await Activity.find();

    res.status(201).json({ allActivity: allActivity, message: "success" });
  }
};

exports.uploadSocialInfo = async (req, res, next) => {
  const check = await verify(req);
  if (check !== "success") {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  } else {
    console.log("req.body=====",req.body);
    const updateUser = await User.updateOne(
      {
        wallet_address: `${req.body.user.toLowerCase()}`,
      },
      {
        $set: {
          instagram: req.body.instagram,
          facebook: req.body.facebook,
          twitter: req.body.twitter,
          telegram: req.body.telegram,
          email: req.body.email,
        },
      }
    );

    res.status(201).json({ message: "success" });
  }
};

exports.getIpInfo = async (req, res, next) => {
  const check = await verify(req);
  if (check !== "success") {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  } else {
    const ipInfo = await Iptracker.find({ wallet_address: `${req.body.user}` });

    if (ipInfo.length !== 0) {
      res.status(200).json({ ipInfo: ipInfo, message: "success" });
    } else {
      res.status.json({ message: "no info found" });
    }
  }
};

exports.blockIp = async (req, res, next) => {
  const check = await verify(req);
  if (check !== "success") {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  } else {
    const updateIp = await Iptracker.updateOne(
      {
        wallet_address: `${req.body.user.toLowerCase()}`,
        "ip_lists.ip_address": `${req.body.ipAddress}`,
      },
      {
        $set: {
          "ip_lists.$.is_blocked": req.body.blockStatus,
        },
      }
    );

    res.status(201).json({ message: "success" });
  }
};

exports.checkAdmin = async (req, res, next) => {
  const check = await verify(req);
  if (check !== "success") {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  } else {
    res.status(200).json({ message: "success" });
  }
};

exports.changeStatus = async (req, res, next) => {
  console.log(req.body, "inside this");
  try {
    Admin.findOneAndUpdate(
      { email: `${req.body.email}` },
      {
        $set: {
          status: req.body.status,
        },
      },
      { new: true, useFindAndModify: false }
    )
      .then((docs) => res.status(200).json({ message: "success" }))
      .catch((err) => console.log(err));
  } catch (err) {
    const error = new HttpError("some error occcurred", 500);
    return next(error);
  }
};

exports.adminCreate = async (req, res, next) => {
  // console.log(req.body);
  let hashedPassword;
  //   const userExist = await Admin.find({ email: `${req.body.email}` });

  //   if (userExist.length !== 0) {
  //     res.json("user already exists!");
  //     return;
  //   }

  try {
    hashedPassword = await bcrypt.hash(req.body.password, 15);
  } catch (err) {
    const error = new HttpError("Could not create user, please try again", 500);
    return next(error);
  }

  let newAdmin;
  newAdmin = {
    user_id: "0001",
    fullname: "the_super_admin",
    email: "",
    password: hashedPassword,
    ip_address: "",
  };

  const createdAdmin = new Admin(newAdmin);
  const savedAdmin = await createdAdmin.save();

  res.status(201).json({
    userId: savedAdmin.user_id,
    email: savedAdmin.email,
  });
};

exports.adminLogin = async (req, res, next) => {
  console.log(req.body);
  const admin = await Admin.find({ fullname: `${req.body.fullname}` });

  if (admin[0].ip_address === "") {
    console.log("inside here");
    const update = await Admin.findOneAndUpdate(
      { fullname: `${req.body.fullname}` },
      {
        $set: {
          ip_address: req.body.ip_address,
        },
      },
      { new: true, useFindAndModify: false }
    );
  }

  if (admin.length === 0) {
    const error = new HttpError("User Does not exists", 500);
    return next(error);
  }

  let validPassword = false;
  try {
    validPassword = await bcrypt.compare(req.body.password, admin[0].password);
  } catch (err) {
    const error = new HttpError("some error occurred", 500);
    return next(error);
  }
  if (!validPassword) {
    const error = new HttpError("password did not match", 500);
    return next(error);
  } else {
    let token;
    try {
      var source = req.headers['user-agent'], 
      ua = useragent.parse(source);
      let obj;
      obj = {
        "ipAddress"   : ip.address(),
        "browser"     : ua.browser,
        "OS"          : ua.os,
        "platform"    : ua.platform,
        "useremail"   : admin[0].email
      };
    
      const loginactivity = new adminActivity(obj);
      const savedlogin = await loginactivity.save();

      token = jwt.sign(
        { userId: admin[0].user_id, email: admin[0].email },
        "supersecret_of_loud_nft",
        { expiresIn: "3h" }
      );

      res.status(200).json({
        email: admin[0].email,
        fullname: admin[0].fullname,
        tfa_status: admin[0].tfa_status,
        token: token,
      });
    } catch (err) {
      console.log("error====",err.message);
      const error = new HttpError(
        "Login failed, please enter valid credentials",
        500
      );
      return next(error);
    }
  }
};

exports.getAllUsers = async (req, res, next) => {
  const check = await verify(req);

  if (check !== "success") {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  } else {
    const allUsers = await User.find();
    res.status(200).json({ allUsers: allUsers, message: "success" });
  }

  // res.send(allUsers);
};

exports.getAllAuctions = async (req, res, next) => {
  const check = await verify(req);

  if (check !== "success") {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  } else {
    const auctions = await Auction.find();
    res.status(200).json({ auctions: auctions, message: "success" });
  }
};

exports.changeBlock = async (req, res, next) => {
  const check = await verify(req);
  if (check !== "success") {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  } else {
    const allUsers = await User.findOneAndUpdate(
      {
        wallet_address: req.body.user,
      },
      {
        $set: {
          is_blocked: req.body.isBlocked,
        },
      }
    );
    res.status(200).json({ message: "success" });
  }
};

exports.deleteNft = async (req, res, next) => {
  const check = await verify(req);
  if (check !== "success") {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  } else {
    const NftDelete = await Nft.findOneAndRemove({
      token_id: req.body.tokenId,
    });

    const creator = await User.updateOne(
      {
        wallet_address: req.body.creator,
      },
      {
        $pull: {
          nfts: {
            token_id: req.body.tokenId,
          },
        },
      },
      { new: false, useFindAndModify: false }
    );

    if (req.body.creator !== req.body.owner) {
      const owner = await User.updateOne(
        {
          wallet_Address: req.body.owner,
        },
        {
          $pull: {
            nfts: {
              token_id: req.body.tokenId,
            },
          },
        },
        { new: false, useFindAndModify: false }
      );
    }
    res.status(200).json({ message: "success" });
  }
};

exports.getAllNfts = async (req, res, next) => {
  const check = await verify(req);
  if (check !== "success") {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  } else {
    const nfts = await Nft.find();
    res.status(200).json({ nfts: nfts, message: "success" });
  }
};

exports.getAllCollectibles = async (req, res, next) => {
  const check = await verify(req);
  if (check !== "success") {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  } else {
    const Collectibles = await Collectible.find();
    res.status(200).json({ collectibles: Collectibles, message: "success" });
  }
};

exports.deleteCollectible = async (req, res, next) => {
  const check = await verify(req);

  if (check !== "success") {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  } else {
    console.log("req.body====",req.body);
    const NftDelete = await Collectible.findOneAndRemove({
      token_id: req.body.tokenId,
    });
    console.log("NftDeleteNftDeleteNftDelete",NftDelete);

    const creator = await User.updateOne(
      {
        wallet_address: req.body.creator,
      },
      {
        $pull: {
          collectibles: {
            token_id: req.body.tokenId,
          },
        },
      },
      { new: false, useFindAndModify: false }
    );

    if (req.body.creator !== req.body.owner) {
      const owner = await User.updateOne(
        {
          wallet_Address: req.body.owner,
        },
        {
          $pull: {
            collectibles: {
              token_id: req.body.tokenId,
            },
          },
        },
        { new: false, useFindAndModify: false }
      );
    }
    res.status(200).json({ message: "success" });
  }
};

exports.changeVerify = async (req, res, next) => {
  console.log(req.body);
  const check = await verify(req);
  if (check !== "success") {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  } else {
    const userExist = await User.findOneAndUpdate(
      {
        wallet_address: `${req.body.user.toLowerCase()}`,
      },
      {
        is_verified: req.body.verify,
      },
      { new: false, useFindAndModify: false }
    );
    res.status(200).json({ message: "success" });
  }
};

exports.getAdminDetail = async (req, res, next) => {
  const check = await verify(req);

  if (check !== "success") {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  } else {
    const details = await Admin.find();
    res.status(200).json({ details: details, message: "success" });
  }
};

exports.updateTFA = async (req, res, next) => {
  try {
    const check = await verify(req);
    if (check !== "success") {
      const error = new HttpError("Authentication failed!", 401);
      return next(error);
    } else {
        let info = req.body;
        let status; let usermail;
        Admin.findOne({}).exec(function(userErr,adminRes){
            var verified = speakeasy.totp.verify({
                secret  : adminRes.tfa_code,
                encoding: 'base32',
                token   : info.tfa_code
            });
            usermail = adminRes.email;
            if(verified) {
                if(adminRes.tfa_status == 0){
                    updatedRule = { tfa_status: 1}
                    status = 'enabled';
                }
                else {
                    var qrName = 'Loud Admin '+usermail;
                    var secret = speakeasy.generateSecret({
                        length: 10,
                        name: qrName
                    });
                    var url = 'https://chart.googleapis.com/chart?chs=168x168&chld=M|0&cht=qr&chl='+secret.otpauth_url+'';							
                    updatedRule = { tfa_status: 0, tfa_code : secret.base32, tfa_url : url};
                    status = 'disabled';
                }
                Admin.updateOne({}, {"$set":updatedRule}).exec(function(errUpdate, resUpdate) {
                    if(resUpdate.nModified == 1) {
                        return res.status(200).json({ status:true, result: updatedRule, message:"2FA has been " + status});
                    }
                    else {
                        return res.status(200).json({ status:false, message:"2FA has not updated"});
                    }
                });
            } else {
                return res.status(200).json({ status:false, message:"Invalid 2FA Code" });
            }
        });
    }
  } catch (error) {
    console.log('====================updateTfa catch====================');
    console.log(e);
    return res.status(500).json({status:false,data:{},message:'Something went wrong'});
  }
  
};

exports.tfaLogin = (req,res) => {
  try {
        let info = req.body;
        Admin.findOne({}).exec(function(userErr,adminRes){
            var verified = speakeasy.totp.verify({
                secret  : adminRes.tfa_code,
                encoding: 'base32',
                token   : info.tfa_code
            });
            if(verified) {
                return res.status(200).json({ status:true, message:"Loggedin successfully" });
            } else {
                return res.status(200).json({ status:false, message:"Invalid 2FA Code" });
            }
        });
  } catch (error) {
    console.log('====================Tfa login catch====================');
    console.log(e);
    return res.status(500).json({status:false,message:'Something went wrong'});
  }
};

exports.getAdminactivity = async (req, res, next) => {
  const check = await verify(req);

  if (check !== "success") {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  } else {
    const loginhistory = await adminActivity.find();
    res.status(200).json({ loginhistory: loginhistory, message: "success" });
  }

  // res.send(allUsers);
};


exports.getBlockIp = async (req, res, next) => {
  try {
    const check = await verify(req);
    if (check !== "success") {
      const error = new HttpError("Authentication failed!", 401);
      return next(error);
    } else {
      ipblock.find().exec((err, data) => {
        if (err) {
            res.status(400).json({ status: false, Message: 'Something Went Wrong. Please Try Again later'})
        } else {
            res.status(200).json({ status: true, result: data, message: 'Retrieved data Successfully'})
        }
    });
    }
} catch (e) {
    res.status(500).json({ status: false, Message: 'Something Went Wrong. Please Try Again later' })
}
};

exports.deleteBlockIp = async (req, res, next) => {
  try {
    const check = await verify(req);
    if (check !== "success") {
      const error = new HttpError("Authentication failed!", 401);
      return next(error);
    } else {
      ipblock.deleteOne({ _id: req.body._id }, function (err, data) {
        if (err) {
            res.status(400).json({ status: false, Message: 'Something Went Wrong. Please Try Again later'})
        } else {
            res.status(200).json({ status: true,Message: data, Message:"IP Address Unblocked" })
        }
    });
    }
} catch (e) {
    res.status(500).json({ status: false, Message: 'Something Went Wrong. Please Try Again later' })
}
};


exports.createBlockIp = async (req, res, next) => {
  try {
    const check = await verify(req);
    if (check !== "success") {
      const error = new HttpError("Authentication failed!", 401);
      return next(error);
    } else {
      var curr = {
        ip_address: req.body.ipaddressvalue,
        createdDate: Date.now(),
        modifiedDate: Date.now(),
    }
    ipblock.findOne({ 'ip_address': req.body.ipaddressvalue }).exec((err, ipdetails) => {
        if (err) {
            res.status(400).json({ status: false, Message: "Please try again later",})
        } else {
            if (ipdetails) {
                res.status(400).json({ status: false, ipdetails: ipdetails, Message: 'Already exists!' })
            } else if (ipdetails == null || ipdetails == undefined) {
                var ipv4 = (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(curr.ip_address))
                if(  ipv4){
                    ipblock.create(curr, (err, data) => {
                        if (err) {
                            res.status(400).json({ status: false, Message: 'Something Went Wrong. Please Try Again later'})
                        } else {
                            res.status(200).json({ status: true, ipdetails: ipdetails, Result: data ,Message: 'IP Address Blocked'})
                        }
                    })
                }else{
                    res.json({ status: false, Message: 'IP Address Invalid'})
                }
            }
        }
    })
    }
} catch (e) {
    res.status(500).json({ status: false, Message: 'Something Went Wrong. Please Try Again later' })
}
};


exports.tokenTransfer = async (req, res, next) => {};
