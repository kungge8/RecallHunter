const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  watchlist: [{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
