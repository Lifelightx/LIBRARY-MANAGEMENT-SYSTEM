const Book = require("../models/Book")
const BorrowingRecord = require("../models/BorrowingRecord")
const Reservation = require("../models/Reservation")
const User = require("../models/User")
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage: storage })

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.addBook = async (req, res) => {
  
  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ message: "Error uploading file" })
    }
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      genre: req.body.genre,
      category: req.body.category,
      quantity: req.body.quantity,
      availableQuantity: req.body.quantity, // Assuming availableQuantity is the same as quantity initially
      imageName: req.file.filename, // Corrected field name to imageName as per the model
    })
    

    try {
      const newBook = await book.save()
      res.status(201).json(newBook)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  })
}

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true })
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }
    res.json(book)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params
    const book = await Book.findByIdAndDelete(id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }
    res.json({ message: "Book deleted successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    if (book.availableQuantity <= 0) {
      return res.status(400).json({ message: "Book is not available" })
    }

    book.availableQuantity -= 1
    await book.save()

    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 14) // Set due date to 14 days from now

    const borrowingRecord = new BorrowingRecord({
      user: req.user.userId,
      book: book._id,
      dueDate: dueDate,
    })
    await borrowingRecord.save()

    res.json({ message: "Book borrowed successfully", dueDate: dueDate })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    const borrowingRecord = await BorrowingRecord.findOne({
      user: req.user.userId,
      book: book._id,
      returned: false,
    })

    if (!borrowingRecord) {
      return res.status(400).json({ message: "No active borrowing record found for this book" })
    }

    book.availableQuantity += 1
    await book.save()

    borrowingRecord.returned = true
    borrowingRecord.returnDate = new Date()

    // Calculate fine if returned late
    if (borrowingRecord.returnDate > borrowingRecord.dueDate) {
      const daysLate = Math.ceil((borrowingRecord.returnDate - borrowingRecord.dueDate) / (1000 * 60 * 60 * 24))
      borrowingRecord.fine = daysLate * 1 // $1 per day late

      const user = await User.findById(req.user.userId)
      user.fines += borrowingRecord.fine
      await user.save()
    }

    await borrowingRecord.save()

    res.json({ message: "Book returned successfully", fine: borrowingRecord.fine })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.renewBook = async (req, res) => {
  try {
    const borrowingRecord = await BorrowingRecord.findOne({
      user: req.user.userId,
      book: req.params.id,
      returned: false,
    })

    if (!borrowingRecord) {
      return res.status(400).json({ message: "No active borrowing record found for this book" })
    }

    if (borrowingRecord.renewed) {
      return res.status(400).json({ message: "This book has already been renewed once" })
    }

    const newDueDate = new Date(borrowingRecord.dueDate)
    newDueDate.setDate(newDueDate.getDate() + 7) // Extend by 7 days

    borrowingRecord.dueDate = newDueDate
    borrowingRecord.renewed = true
    await borrowingRecord.save()

    res.json({ message: "Book renewed successfully", newDueDate: newDueDate })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.reserveBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    if (book.availableQuantity > 0) {
      return res.status(400).json({ message: "Book is currently available, no need to reserve" })
    }

    const existingReservation = await Reservation.findOne({
      user: req.user.userId,
      book: book._id,
      status: "active",
    })

    if (existingReservation) {
      return res.status(400).json({ message: "You have already reserved this book" })
    }

    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 3) // Reservation expires in 3 days

    const reservation = new Reservation({
      user: req.user.userId,
      book: book._id,
      expiryDate: expiryDate,
    })
    await reservation.save()

    res.json({ message: "Book reserved successfully", expiryDate: expiryDate })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
