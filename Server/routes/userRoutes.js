const express = require("express");
const app = express();
const product = require("../controllers/product.js");

// add product route
app.route("/add_product").post(product.add_products);

app.route("/all_products").get(product.get_all_products);

app.route("/all_category").get(product.get_all_categories);

app.route("/category_products").get(product.each_category_products);

module.exports = app;
