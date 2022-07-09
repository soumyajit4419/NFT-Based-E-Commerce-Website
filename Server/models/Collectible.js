const mongoose = require("mongoose");
const shortid = require("shortid");
// const { default: Collectible } = require("../../metatest/src/components/Collectible");

// const Schema = mongoose.Schema;

const Collectible = mongoose.model(
  "collectibles",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    name: String,
    token_id: String,
    created_by: String,
    tx_hash: String,
    quantity: String,
    description: String,
    creator_image: String,
    owner_image: String,
    owned_by: String,
    date: String,
    uri: String,
    music: String,
    cover_image: String,
    on_sale: Boolean,
    on_auction: Boolean,
    royalty: String,
    trending: Boolean,
    transfer: Boolean,
    auction_address: String,
    item_price: String,
    ownerships: [
      {
        _id: { type: String, default: shortid.generate },
        quantity: String,
        owner: String,
        transfer_date: String,
        tx_hash: String,
      },
    ],
    auction_history: [
      {
        _id: { type: String, default: shortid.generate },
        auction_address: String,
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
        quantity: String,
      },
    ],
  })
);

module.exports = Collectible;
