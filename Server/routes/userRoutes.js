const express = require("express");
const app = express();
const product = require("../controllers/product.js");
const user = require("../controllers/user.js");

// product routes
app.route("/add_product").post(product.add_products);

app.route("/all_products").get(product.get_all_products);

app.route("/all_category").get(product.get_all_categories);

app.route("/category_products").get(product.each_category_products);

// user routes
app.route("/add_user").post(user.newuser);

app.route("/update_user").post(user.udpdateuserinfo);

module.exports = app;
