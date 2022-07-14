const product_model = require("../models/product.js");
const { customAlphabet } = require("nanoid");

exports.add_products = async (req, res) => {
  try {
    let product_data = req.body.product_data;

    await Promise.all(
      product_data.map((eachproduct) => {
        let product_id = customAlphabet("1234567890abcdef", 10)();
        eachproduct.product_id = product_id;
        eachproduct.product_serial_number =
          eachproduct.product_brand.substring(0, 2) +
          Math.random().toString(30).slice(2);
      })
    );

    await product_model.insertMany(product_data);

    res.status(200).json({
      message: "All Products Added Successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.get_all_products = async (req, res) => {
  try {
    var product_data = await product_model.find({});

    res.status(200).json({
      message: "All Product details fetched Successfully",
      products: product_data,
      total_products: product_data.length
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.get_all_categories = async (req, res) => {
  try {
    var categories = await product_model.distinct("category", {});

    res.status(200).json({
      message: "All Product categories fetched Successfully",
      all_category: categories,
      total: categories.length
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.each_category_products = async (req, res) => {
  try {
    var category = req.query.category;

    var products = await product_model.find({ category: category });

    res.status(200).json({
      message: "Products of particular category fetched sucessfully",
      products: products,
      total_products: products.length
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

exports.each_product = async (req, res) => {
  try {
    var productid = req.query.productid;

    var product = await product_model.findOne({ product_id: productid });

    res.status(200).json({
      message: "Product details fetched Successfully",
      product: product
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};
