const { Router } = require("express");
const router = Router();
const passport = require("../config/passport");

// /google determines what info we will be receiving from user.
router
  .get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  )
  .get(
    "/google/secrets",
    passport.authenticate("google", {
      successRedirect: "/secrets",
      failureRedirect: "/login",
    })
  );

module.exports = router;