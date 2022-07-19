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
    let wallet_address = req.body.wallet_address;
    let product_id = req.body.product_id;

    if (!user_id) {
      return res.status(400).json({
        message: "User Id is required",
      });
    } else if (!address_line1) {
      return res.status(400).json({
        message: "Address is required",
      });
    } else if (!state) {
      return res.status(400).json({
        message: "State is required",
      });
    } else if (!city) {
      return res.status(400).json({
        message: "City is required",
      });
    } else if (!pincode) {
      return res.status(400).json({
        message: "Pincode is required",
      });
    } else if (!wallet_address) {
      return res.status(400).json({
        message: "Wallet Address is required",
      });
    }

    const user_data = await user_model.findOne({ _id: user_id });

    let order = new order_model({
      owner_id: user_id,
      product_id: product_id,
      owner_wallet_address: wallet_address,
      address: {
        line1: address_line1,
        state: state,
        city: city,
        pincode: pincode,
      },
      transferred: false,
      created_at: new Date(),
    });

    await order.save();

    user_data.orders.push(order._id);

    await user_data.save();

    res.status(200).json({
      message: "Order Placed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`,
    });
  }
};

exports.user_my_orders = async (req, res) => {
  try {
    const web3 = createAlchemyWeb3(
      "wss://eth-rinkeby.alchemyapi.io/v2/REVztWHAcBv-D3_6p9JkKZo4ima_Hspi"
    );

    const Contract = new web3.eth.Contract(
      JSON.parse(contractABI.result),
      constants.ContractAddress
    );
    const balance = await Contract.methods
      .balanceOf(req.user.wallet_address)
      .call();

    let arr = [];

    for (let i = 0; i < balance; i++) {
      let temp = {};

      const token_id = await Contract.methods
        .tokenOfOwnerByIndex(req.user.wallet_address, i)
        .call();

      temp.token_id = token_id;

      arr.push(temp);
    }

    for (let i = 0; i < balance; i++) {
      let obj = arr[i];

      const warranty_info = await Contract.methods
        .getWarrentyInfo(obj.token_id)
        .call();

      obj.product_serial_number = warranty_info.ProductSerialNumber;
      var purchase_date = new Date(warranty_info.ProductPurchaseDate * 1000);
      obj.product_purchase_date = purchase_date;
      var expiry_date = new Date(warranty_info.ProductExpiryDate * 1000);
      obj.product_expiry_date = expiry_date;
    }

    let curr_user = await user_model
      .findById(req.user._id)
      .populate({ path: "orders", options: { sort: { created_at: 1 } } });

    let user_orders = curr_user.orders;

    for (let i = 0; i < balance; i++) {
      let obj = arr[i];

      let curr_order = await order_model.findById(user_orders[i]);

      console.log(curr_order, i);

      if (curr_order) {
        if (curr_order.token_id) {
          continue;
        } else {
          await order_model.updateOne(
            { _id: curr_order._id },
            {
              $set: {
                token_id: obj.token_id,
                product_purchase_date: obj.product_purchase_date,
                warranty_expiry_date: obj.product_expiry_date,
                product_serial_number: obj.product_serial_number,
              },
            }
          );
        }
      }
    }

    let final_orders = [];

    for (let order of user_orders) {
      let temp = {};

      let product_id = order.product_id;

      let product = await product_model.findOne({ product_id: product_id });

      temp.order_details = order;

      temp.product_details = product;

      final_orders.push(temp);
    }

    final_orders.reverse();

    res.status(200).json({
      message: "User's my orders details fetched successfully",
      orders: final_orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`,
    });
  }
};
