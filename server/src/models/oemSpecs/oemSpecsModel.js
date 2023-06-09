const mongoose = require('mongoose');

const oemSpecsSchema = new mongoose.Schema({
  modelName: { type: String, required: true },
  modelYear: { type: Number, required: true },
  newPrice: { type: Number, required: true },
  availableColors: { type: [String], required: true },
  mileage: { type: Number, required: true },
  power: { type: Number, required: true },
  maxSpeed: { type: Number, required: true },
});

const OemSpecsModel = mongoose.model('oemSpecs', oemSpecsSchema);

module.exports = OemSpecsModel;