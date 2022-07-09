const mongoose = require("mongoose");
const shortid = require("shortid");

const IpblockSchema = mongoose.model(
  "ipblock",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    ip_address: { type: String, default: 0 },
    createdDate: { type: Date, default: Date.now() },
    modifiedDate: { type: Date, default: Date.now() },
  })
);

module.exports = IpblockSchema;