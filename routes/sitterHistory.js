var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {
  createSitterHistory,
  getSitterHistory,
} = require("./../controllers/sitterHistory");
const isAuthenticated = require("./../middlewares/tokenAuth");

router.post("/sitter-booking", createSitterHistory);

router.get("/sitter-booking", isAuthenticated.required, getSitterHistory);

module.exports = router;
