const mongoose = require("mongoose")

const borrowingRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  borrowDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  returned: { type: Boolean, default: false },
  renewed: { type: Boolean, default: false },
  fine: { type: Number, default: 0 },
})

module.exports = mongoose.model("BorrowingRecord", borrowingRecordSchema)

