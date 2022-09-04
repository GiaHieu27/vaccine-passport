const router = require("express").Router();

const { verifyToken } = require("../middlewares/tokenHandler");
const {
  createPlace,
  getAllPlace,
  getOnePlace,
  updatePlace,
  deletePlace,
} = require("../controllers/Place");

// place is created by user
router.post("/createPlace", verifyToken, createPlace);

router.get("/", verifyToken, getAllPlace);
router.get("/:id", verifyToken, getOnePlace);

router.put("/:id", verifyToken, updatePlace);

router.delete("/:id", verifyToken, deletePlace);

module.exports = router;
