const mongoose = require("mongoose");
const shortid = require("shortid");

// const Schema = mongoose.Schema;

const transaction = mongoose.model(
  "transactions",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    token_id: String,
    tx_hash: String,
    created_by: String,
    owned_by: String,
    trending: Boolean,
    on_auction: Boolean,
    on_sale: Boolean,
    initial_price: String,
    tx_history: [
      {
        from: String,
        to: String,
        tx_hash: String,
        sold_for: String,
      },
    ],
  })
);

module.exports = Nft;
