exports.isLoggedIn = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect("/login");
};

exports.ensureGuest = (req, res, next) => {
  req.isAuthenticated() ? res.redirect("/secrets") : next();
}