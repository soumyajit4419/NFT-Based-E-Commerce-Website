const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transaction = new Schema({
  created_by: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "users"
  },
  token_id: {
    type: String
  },
  user_wallet_address: {
    type: String
  },
  owned_by: {
    type: String
  }
});

module.exports = mongoose.model("transactions", transaction);
