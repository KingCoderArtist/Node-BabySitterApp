var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {
  signup,
  signin,
  resendEmail,
  verifyEmail,
  editProfile,
  profile,
  forgetPassword,
  resetPassword,
} = require("./../controllers/user");
const { uploadPhoto } = require("./../middlewares/upload");
const isAuthenticated = require("./../middlewares/tokenAuth");

require("../config/userPassport");

router.post(
  "/signup",
  uploadPhoto,
  [
    check("email", "email field is required").isEmail(),
    check("password")
      .notEmpty()
      .withMessage("password field is required")
      .isLength({
        min: 6,
      })
      .withMessage("password must be at least 6 chars long"),
    check("role", "role is required").notEmpty(),
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

router.post(
  "/resend-email",
  [
    check("_id", "_id is required").notEmpty(),
    check("email", "email field is required").isEmail(),
  ],
  resendEmail
);

router.get("/confirm-email/:otp", verifyEmail);

router.get("/profile", isAuthenticated.required, profile);

router.post(
  "/profile",
  uploadPhoto,
  [
    check("email", "email field is required").isEmail(),
    check("password")
      .notEmpty()
      .withMessage("password field is required")
      .isLength({
        min: 6,
      })
      .withMessage("password must be at least 6 chars long"),
    check("role", "role is required").notEmpty(),
  ],
  isAuthenticated.required,
  editProfile
);

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
      })
      .withMessage("password must be at least 6 chars long"),
  ],
  resetPassword
);

module.exports = router;
