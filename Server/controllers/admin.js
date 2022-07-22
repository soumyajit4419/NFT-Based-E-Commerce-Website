const mongoose = require("mongoose");
const order_model = require("../models/orders.js");
const product_model = require("../models/product");
const user_model = require("../models/user");
const constants = require("../core/constants");
const { customAlphabet } = require("nanoid");

exports.add_product = async (req, res) => {
  try {
    let product_data = req.body.product_data;

    await Promise.all(
      product_data.map((eachproduct) => {
        let product_id = customAlphabet("1234567890abcdef", 10)();
        eachproduct.product_id = product_id;
      })
    );

    await product_model.insertMany(product_data);

    res.status(200).json({
      message: "Product Added Successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.get_brand_products = async (req, res) => {
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
      wallet_address: wallet_address
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};
