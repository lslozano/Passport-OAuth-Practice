const { Router } = require("express");
const router = Router();
const passport = require("../config/passport");

const {
  getHome,
  getRegister,
  getLogin,
  getLogout,
  getSecrets,
  getSubmitNewSecret,
  postRegister,
  postSubmitNewSecret,
} = require("../controllers/indexControllers");

const { isLoggedIn, ensureGuest } = require("../middleware/index");

router
  .get("/", getHome)
  .get("/register", getRegister)
  .get("/login", ensureGuest, getLogin)
  .get("/logout", getLogout)
  .get("/secrets", isLoggedIn, getSecrets)
  .get("/submit", isLoggedIn, getSubmitNewSecret)
  .post("/register", postRegister)
  .post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/secrets",
      failureRedirect: "/login",
    })
  )
  .post("/submit", postSubmitNewSecret);

module.exports = router;