var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {
  signup,
  signin,
  profile,
  forgetPassword,
  resetPassword,
} = require("./../controllers/admin");
const isAuthenticated = require("./../middlewares/tokenAuth");

require("../config/adminPassport");

router.post(
  "/signup",
  [
    check("email", "email field is required").isEmail(),
    check("password")
      .notEmpty()
      .withMessage("password field is required")
      .isLength({
        min: 6,
      })
      .withMessage("password must be at least 6 chars long"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email field is required").isEmail(),
    check("password")
      .notEmpty()
      .withMessage("password field is required")
      .isLength({
        min: 6,
      })
      .withMessage("password must be at least 6 chars long"),
  ],
  signin
);

router.get("/profile", isAuthenticated.required, profile);

router.post(
  "/forget-password",
  [check("email", "email field is required").isEmail()],
  forgetPassword
);

router.post(
  "/reset-password/:token",
  [
    check("password")
      .notEmpty()
      .withMessage("password field is required")
      .isLength({
        min: 6,
      }),
  ],
  resetPassword
);

module.exports = router;
