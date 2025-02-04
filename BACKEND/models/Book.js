const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  genre: { type: String, required: true },
  category: { type: String, enum: ["Fiction", "Non-fiction", "Research", "Magazine", "Culture"], required: true },
  quantity: { type: Number, required: true, min: 0 },
  availableQuantity: { type: Number, required: true, min: 0 },
  imageName: { type: String }, // Name of the image in the upload folder
  imageUrl: { type: String }, // URL of the image
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Book", bookSchema)
