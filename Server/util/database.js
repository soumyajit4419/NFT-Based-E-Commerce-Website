const mongoose = require("mongoose");

const mongo_uri =
  "mongodb+srv://codedrift:rahul158@cluster0.rmrec.mongodb.net/flipkart_grid_nft";

const mongoconnectdb = (callback) => {
  mongoose
    .connect(mongo_uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected with the MongoDB Atlas Database");
    })
    .catch((error) => {
      console.log(error, "Not Connected with the Database ");
    });
};

module.exports = mongoconnectdb;
