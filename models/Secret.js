const { model } = require("mongoose");

const secretSchema = require("../schema/SecretSchema");

module.exports = model("Secret", secretSchema);