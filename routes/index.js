const router = require("express").Router();

router.use("/admin", require("./admin"));
router.use("/user", require("./user"));
router.use("/user", require("./company"));
router.use("/user", require("./parent"));
router.use("/user", require("./sitter"));
router.use("/user", require("./stripe"));
router.use("/user", require("./booking"));
router.use("/user", require("./child"));
router.use("/user", require("./sitterHistory"));

module.exports = router;
