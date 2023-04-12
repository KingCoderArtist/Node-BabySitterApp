var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {
  getCompany,
  getCompanyById,
  updateCompanyById,
} = require("./../controllers/company");
const isAuthenticated = require("./../middlewares/tokenAuth");

router.get("/company", isAuthenticated.required, getCompany);

router.get("/company/:id", isAuthenticated.required, getCompanyById);

router.put("/company/:id", isAuthenticated.required, updateCompanyById);

module.exports = router;
