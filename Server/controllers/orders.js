const {createAlchemyWeb3} = require("@alch/alchemy-web3");
const order_model = require("../models/orders.js");
const user_model = require("../models/user");
const contractABI = require("./..//abi.json");

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
    } else if (!wallet_address) {
      return res.status(400).json({
        message: "Wallet Address is required"
      });
    }

    const user_data = await user_model.findOne({ _id: user_id });

    const order_length = user_data.orders.length;

    let index = order_length + 1;

    let order = new order_model({
      owner_id: user_id,
      product: product_id,
      index: index,
      owner_wallet_address: wallet_address,
      product_purchase_date: new Date(),
      address: {
        line1: address_line1,
        state: state,
        city: city,
        pincode: pincode
      }
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

exports.check = async (req, res) => {
  try {
    const web3 = createAlchemyWeb3(
      "wss://eth-rinkeby.alchemyapi.io/v2/REVztWHAcBv-D3_6p9JkKZo4ima_Hspi"
    );

    const ContractAddress = "0x09a1b2395B6a8550e786dfD06f06BedF6591F60C";
    const Contract = new web3.eth.Contract(
      JSON.parse(contractABI.result),
      ContractAddress
    );
    const balance = await Contract.methods
      .getNftOfUser("0x8EB628A6cc9915C2c021082fb669328E0ACF0D5F")
      .call();
    console.log(balance, "bal");
    res.status(200).json({
      message: "ok"
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};
