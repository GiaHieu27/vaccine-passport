const router = require("express").Router();
const { login } = require("../controllers/Admin");

router.post("/login", login);

module.exports = router;
