const User = require("../models/User");
const Secret = require("../models/Secret");

exports.getHome = (req, res) => {
  res.render("home");
};

exports.getRegister = (req, res) => {
  res.render("register");
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.getLogout = (req, res) => {
  req.logout();
  res.redirect("/");
};

// Find user and render the secrets that are within the user's secrets array.
exports.getSecrets = async (req, res) => {
  const userId = req.user._id;

  await User.findOne({ _id: userId }, (err, user) => {
    if (err)
      return console.log(
        `${err}. There was an error accesing the current user.`
      );

    if (user) {
      res.render("secrets", { secrets: user.secrets });
    }
  });
};

exports.getSubmitNewSecret = (req, res) => {
  res.render("submit");
};

// Update user and add the new secret to the secrets array.
exports.postSubmitNewSecret = async (req, res) => {
  const submittedSecret = req.body.secret;

  const secret = new Secret({
    secret: submittedSecret,
  });

  const userId = req.user._id;

  await User.findById(userId, async (err, foundUser) => {
    if (err)
      return console.log(`${err}. There was an error accesing the user.`);
  
    if (foundUser) {
      foundUser.secrets.push(secret);
      await foundUser.save(() => {
        res.redirect("/secrets");
      });
    }
  });
};

exports.postRegister = async (req, res) => {
  const { username, email, password } = req.body;

  await User.register({ username, email }, password, (err, user) => {
    if (!err) {
      res.redirect("/login");
    } else {
      console.log(err);
      res.redirect("/register");
    }
  });
};

// Another way to push the new secret to the array of secrets in our User.
// This one would need to be revised since it saves the secret twice.

// await User.findOneAndUpdate(
//   { _id: userId },
//   { $push: { secrets: secret } },
//   { new: true },
//   (err, foundUser) => {
//     if (err) return console.log(`${err}. There was an error updating the user.`);

//     res.redirect("/secrets");
//   }
// );
