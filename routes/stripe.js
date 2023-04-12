var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { stripePayment } = require("./../controllers/stripe");
const isAuthenticated = require("./../middlewares/tokenAuth");

router.post("/payment", stripePayment);

module.exports = router;
