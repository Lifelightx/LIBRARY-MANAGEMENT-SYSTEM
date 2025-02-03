const Book = require("../models/Book");
const BorrowingRecord = require("../models/BorrowingRecord");
const Reservation = require("../models/Reservation");
const User = require("../models/User");
const multer = require('multer');
const path = require('path');

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage: storage });

// Get All Books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Book (With Image Upload)
exports.addBook = [
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Image upload is required" });
      }

      const book = new Book({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        genre: req.body.genre,
        category: req.body.category,
        quantity: req.body.quantity,
        availableQuantity: req.body.quantity, // Initially same as quantity
        imageName: req.file.filename,
        imageUrl: req.file.path, // Stores the full path
      });

      const newBook = await book.save();
      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];

// Update Book
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Borrow Book
exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.availableQuantity <= 0) {
      return res.status(400).json({ message: "Book is not available" });
    }

    book.availableQuantity -= 1;
    await book.save();

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // Due in 14 days

    const borrowingRecord = new BorrowingRecord({
      user: req.user.userId,
      book: book._id,
      dueDate: dueDate,
    });

    await borrowingRecord.save();
    res.json({ message: "Book borrowed successfully", dueDate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Return Book
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const borrowingRecord = await BorrowingRecord.findOne({
      user: req.user.userId,
      book: book._id,
      returned: false,
    });

    if (!borrowingRecord) {
      return res.status(400).json({ message: "No active borrowing record found" });
    }

    book.availableQuantity += 1;
    await book.save();

    borrowingRecord.returned = true;
    borrowingRecord.returnDate = new Date();

    // Calculate fine for late return
    let fine = 0;
    if (borrowingRecord.returnDate > borrowingRecord.dueDate) {
      const daysLate = Math.ceil((borrowingRecord.returnDate - borrowingRecord.dueDate) / (1000 * 60 * 60 * 24));
      fine = daysLate * 1; // $1 per day

      const user = await User.findById(req.user.userId);
      user.fines += fine;
      await user.save();
    }

    borrowingRecord.fine = fine;
    await borrowingRecord.save();

    res.json({ message: "Book returned successfully", fine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Renew Book
exports.renewBook = async (req, res) => {
  try {
    const borrowingRecord = await BorrowingRecord.findOne({
      user: req.user.userId,
      book: req.params.id,
      returned: false,
    });

    if (!borrowingRecord) {
      return res.status(400).json({ message: "No active borrowing record found" });
    }

    if (borrowingRecord.renewed) {
      return res.status(400).json({ message: "This book has already been renewed once" });
    }

    borrowingRecord.dueDate.setDate(borrowingRecord.dueDate.getDate() + 7); // Extend by 7 days
    borrowingRecord.renewed = true;
    await borrowingRecord.save();

    res.json({ message: "Book renewed successfully", newDueDate: borrowingRecord.dueDate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reserve Book
exports.reserveBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.availableQuantity > 0) {
      return res.status(400).json({ message: "Book is currently available, no need to reserve" });
    }

    const existingReservation = await Reservation.findOne({
      user: req.user.userId,
      book: book._id,
      status: "active",
    });

    if (existingReservation) {
      return res.status(400).json({ message: "You have already reserved this book" });
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3); // Reservation expires in 3 days

    const reservation = new Reservation({
      user: req.user.userId,
      book: book._id,
      expiryDate,
    });

    await reservation.save();
    res.json({ message: "Book reserved successfully", expiryDate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
