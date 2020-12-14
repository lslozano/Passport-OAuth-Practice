const { Schema } = require("mongoose");

const secretSchema = new Schema({
  secret: {
    type: String,
    required: true,
  },
});

module.exports = secretSchema;