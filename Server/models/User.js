const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  profile_image: {
    type: String
  },
  wallet_address: {
    type: String
  },
  blockchain: {
    type: String
  },
  transactions: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "transactions"
  }
});

module.exports = mongoose.model("users", user);
