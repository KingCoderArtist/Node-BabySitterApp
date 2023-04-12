var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {
  createChild,
  getChild,
  updateChild,
  deleteChild,
} = require("./../controllers/child");
const isAuthenticated = require("./../middlewares/tokenAuth");

router.post("/child", isAuthenticated.required, createChild);

router.get("/child", isAuthenticated.required, getChild);

router.put("/child/:id", isAuthenticated.required, updateChild);

router.delete("/child/:id", isAuthenticated.required, deleteChild);

module.exports = router;
