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
  query: {
    type: Schema.Types.ObjectId,
    ref: "Query"
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
