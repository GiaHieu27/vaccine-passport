const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOptions");

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const userVaccineShema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    vaccine: {
      type: ObjectId,
      ref: "Vaccine",
      required: true,
    },
    vaccineLot: {
      type: ObjectId,
      ref: "VaccineLot",
      required: true,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("UserVaccine", userVaccineShema);
