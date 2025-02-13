const User = require("../models/User")
const BorrowingRecord = require("../models/BorrowingRecord")
const Reservation = require("../models/Reservation");
exports.createUser = async (req, res) => {
  try {
    const { username, password, email, name, rollNo, course } = req.body
    const user = new User({ username, password, email, name, rollNo, course })
    await user.save()
    res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.allUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { username, email, role, password, fines, name } = req.body
    const user = await User.findByIdAndUpdate(id, { username, email, role, name, password, fines }, { new: true })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json({ message: "User deleted successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getBorrowedBooks = async (req, res) => {
  try {
    const borrowedBooks = await BorrowingRecord.find({ user: req.user.userId, returned: false }).populate("book").exec()
    res.json(borrowedBooks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getUserFines = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    res.json({ fines: user.fines })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.userId })
      .populate("book") // Populate book details
      .exec();

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId; // User ID from middleware

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current password matches
    if (user.password !== currentPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Update the password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
