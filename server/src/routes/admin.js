const router = require("express").Router();
const { login, summary, checkToken } = require("../controllers/Admin");
const { verifyAdminToken } = require("../middlewares/tokenHandler");

router.post("/login", login);
router.post("/check-token", verifyAdminToken, checkToken);

router.get("/summary", verifyAdminToken, summary);

module.exports = router;
