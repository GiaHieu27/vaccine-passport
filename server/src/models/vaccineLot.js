const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOptions");

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const vaccineLotShema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    vaccinated: {
      type: Number,
      required: true,
      default: 0,
    },
    vaccine: {
      type: ObjectId,
      ref: "Vaccine",
      required: true,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("VaccineLot", vaccineLotShema);
