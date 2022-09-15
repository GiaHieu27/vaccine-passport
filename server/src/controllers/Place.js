const { Place, UserPlace } = require('../models');

exports.createPlace = async (req, res) => {
  try {
    const newPlace = await new Place({
      ...req.body,
      creator: req.user._id,
    }).save();
    res.status(200).json(newPlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPlace = async (req, res) => {
  try {
    const listPlace = await Place.find({})
      .populate('creator')
      .sort('-createdAt');

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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOnePlace = async (req, res) => {
  try {
    const placeId = req.params.id;
    const place = await Place.findById(placeId).populate('creator');
    const userVisitedLast24h = await UserPlace.find({
      place: place._id,
      createdAt: {
        $gt: new Date(Date.now() - 24 * 60 * 60 * 10000),
      },
    }).populate('user');
    place._doc.userVisitedLast24h = userVisitedLast24h;

    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const placeId = req.params.id;
    const userId = req.user._id;

    const place = await Place.findOneAndUpdate(
      { _id: placeId, creator: userId },
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePlace = async (req, res) => {
  const placeId = req.params.id;
  const userId = req.user._id;
  try {
    await UserPlace.deleteMany({ place: placeId });
    await Place.findOneAndDelete({ _id: placeId, creator: userId });

    res.status(200).json({ message: 'deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
