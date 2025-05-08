const mongoose = require("mongoose");

const ExchangeRequestSchema = new mongoose.Schema({
  requestedBook: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to the book ID
  offeredBook: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to the book ID
  requester: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to the user ID
  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ExchangeRequest", ExchangeRequestSchema);