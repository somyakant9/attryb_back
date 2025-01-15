const mongoose = require("mongoose");

const OemSpecSchema = new mongoose.Schema({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  listPrice: { type: Number, required: true },
  availableColors: { type: [String], required: true },
  mileage: { type: Number, required: true },
  powerBHP: { type: Number, required: true },
  maxSpeed: { type: Number, required: true },
});

module.exports = mongoose.model("OemSpec", OemSpecSchema);
