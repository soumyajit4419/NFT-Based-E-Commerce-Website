const mongoose = require("mongoose");
const shortid = require("shortid");

const AdminloginSchema = mongoose.model(
  "adminloginhistory",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    email       : { type: String },
    ipAddress   : { type: String },
    browser     : { type: String },
    OS          : { type: String},
    platform    : {type :String},
    createdDate : {type: Date, default: Date.now()},
    modifiedDate: {type: Date, default: Date.now()},
  })
);

module.exports = AdminloginSchema;