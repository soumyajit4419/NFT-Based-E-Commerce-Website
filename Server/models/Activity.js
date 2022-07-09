const mongoose = require("mongoose");
const shortid = require("shortid");

const Activity = mongoose.model(
  "activity",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    type: String,
    date: String,
    by: String,
    by_name: String,
    image: String,
    to: String,
    amount: String,
    token_id: String,
    name: String,
    url: String,
    tx_hash: String,
  })
);

module.exports = Activity;
