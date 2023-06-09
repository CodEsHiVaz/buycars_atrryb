const mongoose = require("mongoose");
const inventorySchema = new mongoose.Schema({
  modelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "oemSpecs",
    required: true,
  },
  modelName: { type: String, required: true },
  image: { type: String, required: true },
  milage: { type: Number, required: true },
  odometerKms: { type: Number, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  majorScratches: { type: Boolean },
  registrationPlace: { type: String, required: true },
  originalPaint: { type: Boolean },
  reportedAccidents: { type: Number, required: true },
  previousBuyersNumber: { type: Number, required: true },
  points: { type: [ String ], required: true },
  userId: { type: String, required: true },
});

const InventoryModel = mongoose.model("marketplaceInventory", inventorySchema);

module.exports = InventoryModel;



  

 
  
 
