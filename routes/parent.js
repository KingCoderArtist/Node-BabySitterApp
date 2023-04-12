var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {
  getParent,
  getParentById,
  updateParentById,
  addParentLocation,
  getParentLocation,
} = require("./../controllers/parent");
const isAuthenticated = require("./../middlewares/tokenAuth");

router.get("/parent", isAuthenticated.required, getParent);

router.get("/parent/:id", isAuthenticated.required, getParentById);

router.put("/parent/:id", isAuthenticated.required, updateParentById);

router.post("/addparent/location", isAuthenticated.required, addParentLocation);

router.get("/getparent/location", isAuthenticated.required, getParentLocation);

module.exports = router;
