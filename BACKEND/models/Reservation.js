const mongoose = require("mongoose")

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  reservationDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ["active", "fulfilled", "expired"], default: "active" },
})

module.exports = mongoose.model("Reservation", reservationSchema)

