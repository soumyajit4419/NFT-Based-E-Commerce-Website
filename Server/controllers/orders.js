const mongoose = require("mongoose");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const order_model = require("../models/orders.js");
const product_model = require("../models/product");
const user_model = require("../models/user");
const contractABI = require("./../abi.json");
const constants = require("../core/constants");

exports.new_order = async (req, res) => {
  try {
    let address_line1 = req.body.address;
    let state = req.body.state;
    let city = req.body.city;
    let pincode = req.body.pincode;
    let user_id = req.user._id;
    let product_id = req.body.product_id;
    let product_serial_number = req.body.product_serial_number;

    if (!user_id) {
      return res.status(400).json({
        message: "User Id is required"
      });
    } else if (!address_line1) {
      return res.status(400).json({
        message: "Address is required"
      });
    } else if (!state) {
      return res.status(400).json({
        message: "State is required"
      });
    } else if (!city) {
      return res.status(400).json({
        message: "City is required"
      });
    } else if (!pincode) {
      return res.status(400).json({
        message: "Pincode is required"
      });
    } else if (!product_id) {
      return res.status(400).json({
        message: "Product ID is required"
      });
    } else if (!product_serial_number) {
      return res.status(400).json({
        message: "Product Serial Number is required"
      });
    }

    const user_data = await user_model.findOne({ _id: user_id });

    let order = new order_model({
      owner_id: user_id,
      product_id: product_id,
      product_serial_number: product_serial_number,
      address: {
        line1: address_line1,
        state: state,
        city: city,
        pincode: pincode
      },
      transferred: false,
      created_at: new Date()
    });

    await order.save();

    user_data.orders.push(order._id);

    await user_data.save();

    res.status(200).json({
      message: "Order Placed Successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.user_my_orders = async (req, res) => {
  try {
    let user_id = req.user._id;

    let wallet_address = req.user.wallet_address;

    if (!user_id) {
      return res.status(400).json({
        message: "User Id is required"
      });
    }

    let all_orders = await user_model.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(user_id)
        }
      },
      {
        $unset: [
          "email",
          "password",
          "wallet_address",
          "profile_image",
          "blockchain",
          "__v",
          "transfers"
        ]
      },
      {
        $lookup: {
          from: "orders",
          localField: "orders",
          foreignField: "_id",
          as: "orders_details"
        }
      },
      {
        $unwind: {
          path: "$orders_details"
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "orders_details.product_id",
          foreignField: "product_id",
          as: "product_details"
        }
      },
      {
        $unwind: {
          path: "$product_details"
        }
      },
      {
        $unset: "orders"
      }
    ]);

    res.status(200).json({
      message: "User's my orders details fetched successfully",
      orders: all_orders,
      total_orders: all_orders.length,
      wallet_address:wallet_address
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

// exports.transfer_nft = async (req, res) => {
//   try {
//     let product_serial_number = req.body.product_serial_number;

//     const product_data = await order_model.findOne({
//       product_serial_number: product_serial_number
//     });

//     product_data.transferred = true;

//     product_data.save();

//     res.status(200).json({
//       message: "Order Put On Sale Successfully"
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Some error occured",
//       error: `${error.name}, ${error.message}, ${error.stack}`
//     });
//   }
// };

// exports.all_transfer_orders = async (req, res) => {
//   try {
//     let user_id = req.user._id;

//     if (!user_id) {
//       return res.status(400).json({
//         message: "User Id is required"
//       });
//     }

//     let all_transfer_orders = await user_model.aggregate([
//       {
//         $match: {
//           _id: mongoose.Types.ObjectId(user_id)
//         }
//       },
//       {
//         $unset: [
//           "email",
//           "password",
//           "wallet_address",
//           "profile_image",
//           "blockchain",
//           "__v",
//           "orders"
//         ]
//       },
//       {
//         $lookup: {
//           from: "orders",
//           localField: "transfers",
//           foreignField: "_id",
//           as: "transfer_details"
//         }
//       },
//       {
//         $unwind: {
//           path: "$transfer_details"
//         }
//       },
//       {
//         $lookup: {
//           from: "products",
//           localField: "transfer_details.product_id",
//           foreignField: "product_id",
//           as: "product_details"
//         }
//       },
//       {
//         $unwind: {
//           path: "$product_details"
//         }
//       },
//       {
//         $unset: "transfers"
//       }
//     ]);

//     res.status(200).json({
//       message: "User's taansfer order details fetched successfully",
//       orders: all_transfer_orders,
//       total_orders: all_transfer_orders.length
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Some error occured",
//       error: `${error.name}, ${error.message}, ${error.stack}`
//     });
//   }
// };

// exports.all_sale_orders = async (req, res) => {
//   try {
//     let user_id = req.user._id;

//     if (!user_id) {
//       return res.status(400).json({
//         message: "User Id is required"
//       });
//     }

//     let all_orders = await user_model.aggregate([
//       {
//         $match: {
//           _id: mongoose.Types.ObjectId(user_id)
//         }
//       },
//       {
//         $unset: [
//           "email",
//           "password",
//           "wallet_address",
//           "profile_image",
//           "blockchain",
//           "__v",
//           "transfers"
//         ]
//       },
//       {
//         $lookup: {
//           from: "orders",
//           localField: "orders",
//           foreignField: "_id",
//           as: "orders_details"
//         }
//       },
//       {
//         $unwind: {
//           path: "$orders_details"
//         }
//       },
//       {
//         $lookup: {
//           from: "products",
//           localField: "orders_details.product_id",
//           foreignField: "product_id",
//           as: "product_details"
//         }
//       },
//       {
//         $unwind: {
//           path: "$product_details"
//         }
//       },
//       {
//         $unset: "orders"
//       }
//     ]);

//     res.status(200).json({
//       message: "User's my orders details fetched successfully",
//       orders: all_orders,
//       total_orders: all_orders.length
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Some error occured",
//       error: `${error.name}, ${error.message}, ${error.stack}`
//     });
//   }
// };
