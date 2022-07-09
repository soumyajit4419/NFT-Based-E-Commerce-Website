const mongoose = require("mongoose");
const shortid = require("shortid");

// const Schema = mongoose.Schema;

const Nft = mongoose.model(
  "nfts",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    token_id: String,
    tx_hash: String,
    created_by: String,
    owned_by: String,
    trending: Boolean,
    on_auction: Boolean,
    auction_address: String,
    auction_end_time: String,
    on_sale: Boolean,
    cover_image: String,
    initial_price: String,
    transfer: Boolean,
    creator_image: String,
    owner_image: String,
    royalty: Number,
    music: String,
    description: String,
    date: String,
    name: String,
    royalty: String,
    token_type: String,
    previous_auction: Boolean,
    auction_history: [
      {
        _id: { type: String, default: shortid.generate },
        auction_address: String,
      },
    ],
    likes: [
      {
        _id: { type: String, default: shortid.generate },
        wallet_address: String,
      },
    ],
    views: [
      {
        _id: { type: String, default: shortid.generate },
        wallet_address: String,
      },
    ],
    tx_history: [
      {
        _id: { type: String, default: shortid.generate },
        from: String,
        to: String,
        tx_hash: String,
        sold_for: String,
        selling_type: String,
        message: String,
      },
    ],
  })
);

module.exports = Nft;
