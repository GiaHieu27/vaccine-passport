const jwt = require("jsonwebtoken");
const { User, UserVaccine, UserPlace } = require("../models");

exports.createUser = async (req, res) => {
  const { phoneNumber, idNumber } = req.body;
  try {
    let user = await User.findOne({ phoneNumber });
    if (user) {
      return res.status(403).json({
        message: "Phone number already registered for another account",
      });
    }

    user = await User.findOne({ idNumber });
    if (user) {
      return res.status(403).json({
        message: "Id number already registered for another account",
      });
    }

    const newUser = await User(req.body).save();
    const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET_KEY);
    res.status(200).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const listUser = await User.find({}).sort("-createdAt");
    for (const user of listUser) {
      const vaccine = await UserVaccine.find({ user: user._id }).sort(
        "-createdAt"
      );
      user._doc.vaccine = vaccine;
    }
    res.status(200).json(listUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    const userVaccine = await UserVaccine.find({ user: userId })
      .populate("vaccine")
      .populate("vaccineLot")
      .sort("-createdAt");

    const userPlaceVisit = await UserPlace.find({ user: userId })
      .populate("place")
      .sort("-createdAt");

    user._doc.vaccinated = userVaccine;
    user._doc.placeVisited = userPlaceVisit;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { phoneNumber, idNumber } = req.body;
  const userId = req.params.id;
  try {
    let user = await User.findOne({ phoneNumber });
    if (user) {
      return res.status(403).json({
        message: "Phone number already registered",
      });
    }

    user = await User.findOne({ idNumber });
    if (user) {
      return res.status(403).json({
        message: "Id number already registered",
      });
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await UserVaccine.deleteMany({ user: userId });
    await UserPlace.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
