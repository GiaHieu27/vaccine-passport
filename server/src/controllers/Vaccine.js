const { Vaccine, VaccineLot, UserVaccine } = require("../models");

exports.createVaccine = async (req, res) => {
  try {
    const { name } = req.body;
    const newVaccine = await new Vaccine({ name }).save();

    newVaccine._doc.quantity = 0;
    newVaccine._doc.vaccinated = 0;
    newVaccine._doc.vaccineLot = [];

    res.status(200).json(newVaccine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllVaccine = async (req, res) => {
  try {
    const vaccineList = await Vaccine.find({}).sort("-createdAt");
    for (const vaccine of vaccineList) {
      const vaccineLots = await VaccineLot.find({ vaccine: vaccine._id });
      vaccine._doc.quantity = vaccineLots.reduce(
        (total, item) => total + Number(item.quantity),
        0
      );
      vaccine._doc.vaccinated = vaccineLots.reduce(
        (total, item) => total + Number(item.vaccinated),
        0
      );
      vaccine._doc.vaccineLots = vaccineLots;
    }
    res.status(200).json(vaccineList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneVaccine = async (req, res) => {
  const vaccineId = req.params.id;
  try {
    const vaccine = await Vaccine.findById(vaccineId);
    const vaccineLots = await VaccineLot.find({ vaccine: vaccine._id });
    vaccine._doc.quantity = vaccineLots.reduce(
      (total, item) => total + Number(item.quantity),
      0
    );
    vaccine._doc.vaccinated = vaccineLots.reduce(
      (total, item) => total + Number(item.vaccinated),
      0
    );
    vaccine._doc.vaccineLots = vaccineLots;
    res.status(200).json(vaccine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVaccine = async (req, res) => {
  const vaccineId = req.params.id;
  try {
    const vaccine = await Vaccine.findByIdAndUpdate(
      vaccineId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(vaccine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteVaccine = async (req, res) => {
  const vaccineId = req.params.id;
  try {
    await VaccineLot.deleteMany({ vaccine: vaccineId });
    await UserVaccine.deleteMany({ vaccine: vaccineId });
    await Vaccine.findByIdAndDelete(vaccineId);

    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
