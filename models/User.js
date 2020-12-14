const { model } = require("mongoose");

const userSchema = require("../schema/UserSchema");

module.exports = model("User", userSchema);