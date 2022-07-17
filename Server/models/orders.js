const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order = new Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "users"
  },
  product: {
    type: String
  },
  index: {
    type: Number
  },
  token_id: {
    type: String
  },
  owner_wallet_address: {
    type: String
  },
  product_purchase_date: {
    type: Date
  },
  product_expiry_date: {
    type: Date
  },
  address: {
    line1: {
      type: String
    },
    state: {
      type: String
    },
    city: {
      type: String
    },
    pincode: {
      type: Number
    }
  }
});

module.exports = mongoose.model("orders", order);
