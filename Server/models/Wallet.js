const mongoose = require("mongoose");
const shortid = require("shortid");

const Wallet = mongoose.model(
  "Wallet",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    wallet_address: String,
    private_key: String,
  })
);

module.exports = Wallet;
