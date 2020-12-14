const User = require("../models/User");

// client id and client secret are obtained in google developer dashboard.
// callbackURL is going to be url where we will land after our verification is complete.
exports.googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
};

// The verification callback to execute on the google strategy.
// It creates a new user or if there is already one, it just finish it's execution.
exports.verifyCallback = async (accessToken, refreshToken, profile, done) => {
  await User.findOne({ googleId: profile.id }, async (err, user) => {
    if (err) return done(err);

    if (!user) {
      const newUser = new User({
        username: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
      });

      await newUser.save((err) => {
        if (err) return console.log(err);
      });

      return done(err, user);
    } else {
      return done(err, user);
    }
  });
};

