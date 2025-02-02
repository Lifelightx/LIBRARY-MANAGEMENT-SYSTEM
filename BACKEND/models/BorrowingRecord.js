
const mongoose = require('mongoose');

const borrowingRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  borrowDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  returned: { type: Boolean, default: false },
})

export default mongoose.model("BorrowingRecord", borrowingRecordSchema)

