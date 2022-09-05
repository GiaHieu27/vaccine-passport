const router = require("express").Router();

const { verifyAdminToken } = require("../middlewares/tokenHandler");
const {
  createVaccine,
  getAllVaccine,
  getOneVaccine,
  updateVaccine,
  deleteVaccine,
} = require("../controllers/Vaccine");
const {
  createVaccineLot,
  getAllVaccineLot,
  getOneVaccineLot,
  updateVaccineLot,
  deleteVaccineLot,
} = require("../controllers/VaccineLot");

router.post("/createVaccine", verifyAdminToken, createVaccine);
router.get("/", verifyAdminToken, getAllVaccine);
router.get("/:id", verifyAdminToken, getOneVaccine);
router.put("/:id", verifyAdminToken, updateVaccine);
router.delete("/:id", verifyAdminToken, deleteVaccine);

// vaccine lot
router.post("/lot/createVaccineLot", verifyAdminToken, createVaccineLot);
router.get("/lot/get-all", verifyAdminToken, getAllVaccineLot);
router.get("/lot/:id", verifyAdminToken, getOneVaccineLot);
router.put("/lot/:id", verifyAdminToken, updateVaccineLot);
router.delete("/lot/:id", verifyAdminToken, deleteVaccineLot);

module.exports = router;
