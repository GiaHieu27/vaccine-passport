const { Place, UserPlace } = require("../models");

exports.createPlace = async (req, res) => {
  try {
    const newPlace = await new Place({
      ...req.body,
      creator: req.user._id,
    }).save();
    res.status(200).json(newPlace);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getAllPlace = async (req, res) => {
  try {
    const listPlace = await Place.find({})
      .populate("creator")
      .sort("-createdAt");

    for (const place of listPlace) {
      const userVisitedLast24h = await UserPlace.find({
        place: place._id,
        createdAt: {
          $gt: new Date(Date.now() - 24 * 60 * 60 * 10000),
        },
      });
      place._doc.userVisitedLast24h = userVisitedLast24h;
    }

    res.status(200).json(listPlace);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getOnePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id).populate("creator");
    const userVisitedLast24h = await UserPlace.find({
      place: place._id,
      createdAt: {
        $gt: new Date(Date.now() - 24 * 60 * 60 * 10000),
      },
    });
    place._doc.userVisitedLast24h = userVisitedLast24h;

    res.status(200).json(place);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req?.user?._id;
    const adminId = req?.admin?._id;

    const place = await Place.findOneAndUpdate(
      { _id: id, creator: userId ? userId : adminId },
      {
        $set: req.body,
      }
    );

    res.status(200).json(place);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.deletePlace = async (req, res) => {
  const { id } = req.params;
  try {
    await UserPlace.deleteMany({ place: id });
    await Place.findOneAndDelete({ _id: id, creator: req.user._id });

    res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
