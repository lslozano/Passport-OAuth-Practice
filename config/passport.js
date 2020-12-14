const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const { googleOptions, verifyCallback } = require("../strategies/Google");

passport.use(User.createStrategy());

// encrypt user.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// decrypt user.
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// This is the google auth strategy.
passport.use(
  new GoogleStrategy(googleOptions, verifyCallback)
);

module.exports = passport;