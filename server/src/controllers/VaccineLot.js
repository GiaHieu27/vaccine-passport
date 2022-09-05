const { VaccineLot, UserVaccine } = require("../models");

exports.createVaccineLot = async (req, res) => {
  const { name, quantity, vaccineId } = req.body;
  try {
    const newVaccineLot = await new VaccineLot({
      name,
      quantity,
      vaccinated: 0,
      vaccine: vaccineId,
    }).save();
    res.status(200).json(newVaccineLot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllVaccineLot = async (req, res) => {
  try {
    const vaccineLotList = await VaccineLot.find({})
      .populate("vaccine")
      .sort("-createdAt");
    res.status(200).json(vaccineLotList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOneVaccineLot = async (req, res) => {
  try {
    const vaccineLot = await VaccineLot.findById(req.params.id).populate(
      "vaccine"
    );
    res.status(200).json(vaccineLot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateVaccineLot = async (req, res) => {
  try {
    const updatedVaccineLot = await VaccineLot.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedVaccineLot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteVaccineLot = async (req, res) => {
  try {
    const vaccineLotId = req.params.id;
    await UserVaccine.deleteMany({ vaccineLot: vaccineLotId });
    await VaccineLot.findByIdAndDelete(vaccineLotId);
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
