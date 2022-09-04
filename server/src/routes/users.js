const router = require("express").Router();

const { verifyAdminToken } = require("../middlewares/tokenHandler");
const {
  createUser,
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/User");

router.post("/createUser", verifyAdminToken, createUser);

router.get("/", verifyAdminToken, getAllUser);
router.get("/:id", verifyAdminToken, getOneUser);

router.put("/:id", verifyAdminToken, updateUser);

router.delete("/:id", verifyAdminToken, deleteUser);

module.exports = router;
