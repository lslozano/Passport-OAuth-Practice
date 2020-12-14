const { Schema } = require("mongoose");
const PLM = require("passport-local-mongoose");
const secretSchema = require("./SecretSchema");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    default: "",
  },
  secrets: [secretSchema],
});

// usernameField - determines which field will be considered the username.
// By default it is the username.
// If you want to establish the email as username, you need to switch this up.
userSchema.plugin(PLM, { usernameField: "username" });

module.exports = userSchema;