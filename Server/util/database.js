const mongoose = require("mongoose");
// const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  mongoose
    .connect(
      process.env.MONGODB_URL ||
        "mongodb+srv://superadmin:EDMK3lPSqIXxdAQH@louddatabase.kruit.mongodb.net/loudDatabase?retryWrites=true&w=majority",

      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    )
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log(err, "error this is incommming");
    });
};

module.exports = mongoConnect;
