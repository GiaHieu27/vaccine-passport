const router = require("express").Router();
const { login, summary } = require("../controllers/Admin");
const { verifyAdminToken } = require("../middlewares/tokenHandler");

router.post("/login", login);

router.get("/summary", verifyAdminToken, summary);

module.exports = router;
