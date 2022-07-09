const mongoose = require("mongoose");
const shortid = require("shortid");

const Auction = mongoose.model(
  "Auction",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    contract_address: String,
    winner: String,
    creator: String,
    token_id: String,
    end_time: String,
    status: String,
    is_live: Boolean,
    highest_bid: String,
    highest_bidder: String,
    bidder_count: Number,
    withdraw_remaining: Number,
    date: String,
    bidders: [
      {
        _id: { type: String, default: shortid.generate },
        bidder_address: String,
        amount: String,
        date: String,
        withdraw: Boolean,
        auction_winner: Boolean,
      },
    ],
  })
);

module.exports = Auction;
