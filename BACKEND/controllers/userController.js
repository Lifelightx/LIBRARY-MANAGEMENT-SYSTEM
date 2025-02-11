const User = require("../models/User")
const BorrowingRecord = require("../models/BorrowingRecord")

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
    const { username, email, role } = req.body
    const user = await User.findByIdAndUpdate(id, { username, email, role }, { new: true })
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
