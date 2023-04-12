var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {
  getSitter,
  getSitterById,
  updateSitterById,
} = require("./../controllers/sitter");
const isAuthenticated = require("./../middlewares/tokenAuth");

router.get("/sitter", isAuthenticated.required, getSitter);

router.get("/sitter/:id", isAuthenticated.required, getSitterById);

router.put("/sitter/:id", isAuthenticated.required, updateSitterById);

module.exports = router;
