const router = require("express").Router();

router.use("/admin", require("./admin"));
router.use("/user", require("./users"));
router.use("/place", require("./place"));
router.use("/vaccine", require("./vaccine"));

module.exports = router;
