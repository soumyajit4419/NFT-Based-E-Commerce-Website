const mongoose = require("mongoose");
const shortid = require("shortid");

const Activity = mongoose.model(
  "iptracker",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    wallet_address: String,
    ip_lists: [
      {
        _id: { type: String, default: shortid.generate },
        ip_address: String,
        is_blocked: Boolean,
        last_login: String,
        date: String,
      },
    ],
  })
);

module.exports = Activity;
