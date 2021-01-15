const mongoose = require("mongoose");

// Schema of user
const Schema = mongoose.Schema;

// define structure of User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // timestamp will auto-generate timedata to each item (created and updated)
);

// create a model based on this Schema
const User = mongoose.model("User", userSchema);

// export model to be used in other components
module.exports = User;
