const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productName: String,
  productType: String
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
