const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const {
  Admin,
  User,
  Place,
  UserVaccine,
  Vaccine,
  VaccineLot,
} = require("../models");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const decryptedPass = CryptoJS.AES.decrypt(
      admin.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPass !== password)
      return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: admin._id }, process.env.TOKEN_SECRET_KEY);
    admin.password = undefined;

    res.status(200).json({ token, admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.summary = async (req, res) => {
  try {
    const totalUser = await User.find({}).count();
    const totalPlace = await Place.find({}).count();

    // count user who has been vaccinated
    const userVaccinated = await UserVaccine.aggregate([
      {
        $group: { _id: "$user" },
      },
    ]).count("user");

    // count total vaccine dose
    const totalVaccineDose = await Vaccine.aggregate([
      {
        $group: {
          _id: null,
          quantity: { $sum: "$quantity" },
        },
      },
    ]);

    // count total used vaccine dose
    const totalVaccineDoseUsed = await Vaccine.aggregate().group({
      _id: null,
      vaccinated: { $sum: "$vaccinated" },
    });

    // get late vaccine lot
    const lastestVaccineLot = await VaccineLot.find({})
      .sort("-createdAt")
      .limit(4)
      .populate("vaccine");

    // count user who has one vaccine dose
    const userWithOneDose = await UserVaccine.aggregate()
      .group({
        _id: "$user",
        quantity: { $sum: +1 },
      })
      .match({ quantity: 1 })
      .count("count");

    // count user who has >= two dose
    const userWithAboveTwoDose = await UserVaccine.aggregate()
      .group({
        _id: "$user",
        quantity: { $sum: +1 },
      })
      .match({ quantity: { $gte: 2 } })
      .count("count");

    res.status(200).json({
      totalUser,
      totalPlace,
      userVaccinated: userVaccinated[0].user,
      availableVaccineDose:
        (totalVaccineDose[0] ? totalVaccineDose[0].quantity : 0) -
        (totalVaccineDoseUsed[0] ? totalVaccineDoseUsed[0].vaccinated : 0),
      lastestVaccineLot,
      userVaccinatedAnalyst: {
        totalUser,
        userWithAboveTwoDose: userWithAboveTwoDose[0]
          ? userWithAboveTwoDose[0].count
          : 0,
        userWithOneDose: userWithOneDose[0] ? userWithOneDose[0].count : 0,
        userWithZeroDose:
          totalUser - (userVaccinated[0] ? userVaccinated[0].user : 0),
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
