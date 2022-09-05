const router = require("express").Router();

const { verifyAdminToken } = require("../middlewares/tokenHandler");
const {
  createVaccine,
  getAllVaccine,
  getOneVaccine,
  updateVaccine,
  deleteVaccine,
} = require("../controllers/Vaccine");

router.post("/createVaccine", verifyAdminToken, createVaccine);

router.get("/", verifyAdminToken, getAllVaccine);
router.get("/:id", verifyAdminToken, getOneVaccine);

router.put("/:id", verifyAdminToken, updateVaccine);

router.delete("/:id", verifyAdminToken, deleteVaccine);

module.exports = router;
