const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuerySchema = new Schema({
  productName: String,
  productType: String
});

const Query = mongoose.model("Query", QuerySchema);

module.exports = Query;
