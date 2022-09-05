const router = require("express").Router();

const {
  verifyAdminToken,
  verifyToken,
} = require("../middlewares/tokenHandler");
const {
  createUser,
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
  vaccinated,
  getAllPlacedOfUser,
  checinPlace,
  placeVisited,
} = require("../controllers/User");

router.post("/createUser", verifyAdminToken, createUser);

router.get("/", verifyAdminToken, getAllUser);
router.get("/:id", verifyAdminToken, getOneUser);

router.put("/:id", verifyAdminToken, updateUser);

router.delete("/:id", verifyAdminToken, deleteUser);

// some apis
router.post("/vaccinated", verifyAdminToken, vaccinated);
router.post("/checin-place", verifyToken, checinPlace);

router.get("/:userId/place", verifyAdminToken, getAllPlacedOfUser);
router.get("/:userId/place-visited", verifyToken, placeVisited);

module.exports = router;
