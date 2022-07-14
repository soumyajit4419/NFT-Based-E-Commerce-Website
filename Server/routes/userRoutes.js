const express = require("express");
const app = express();
const product = require("../controllers/product.js");
const user = require("../controllers/user.js");

const verify = require("../middlewares/verify");

// user routes
app.route("/register").post(user.register);

app.route("/login").post(user.login);

app.route("/user").get(user.get_user);

// product routes
app.route("/add_product").post(product.add_products);

app.route("/all_products").get(verify.verify, product.get_all_products);

app.route("/all_category").get(verify.verify, product.get_all_categories);

app
  .route("/category_products")
  .get(verify.verify, product.each_category_products);

app.route("/product/:productid").get(verify.verify, product.each_product);

module.exports = app;
