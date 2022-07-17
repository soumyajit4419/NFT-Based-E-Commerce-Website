const express = require("express");
const app = express();
const product = require("../controllers/product.js");
const user = require("../controllers/user.js");
const nft = require("../controllers/nft.js");
const verify = require("../middlewares/verify");
const sendmsg = require("../controllers/sendmsg");

// user routes
app.route("/register").post(user.register);

app.route("/login").post(user.login);

app.route("/user").get(verify.verify, user.get_user);

app.route("/valid_user").get(verify.valid_user);

//send message (15 credits left so dont use this api unless required)
// app.route("/sendmsg").post(verify.verify, sendmsg.sendmsg);

// product routes
app.route("/add_product").post(product.add_products);

app.route("/all_products").get(product.get_all_products);

app.route("/all_category").get(product.get_all_categories);

app.route("/category_products").get(product.each_category_products);

app.route("/product").get(product.each_product);

app.route("/mint").get(nft.nft);

module.exports = app;
