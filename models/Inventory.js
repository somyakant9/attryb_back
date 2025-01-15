const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new mongoose.Schema({
  dealerId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Unique ID for the dealer
  carImage: { type: String, required: true }, // URL or path for the car image
  title: { type: String, required: true }, // Title of the listing
  kmsDriven: { type: Number, required: true },
  majorScratches: { type: Boolean, required: true },
  originalPaint: { type: Boolean, required: true },
  accidentsReported: { type: Number, required: true },
  previousBuyers: { type: Number, required: true },
  registrationPlace: { type: String, required: true },
});

module.exports = mongoose.model('Inventory', InventorySchema);
