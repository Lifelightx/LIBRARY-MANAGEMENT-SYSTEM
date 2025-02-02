const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashedPassword, email, role: "user" })
    await user.save()
    res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    // console.log(username,password)
    const user = await User.findOne({ username })
    console.log(user)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // console.log(await bcrypt.compare(password, user.password))
      return res.status(400).json({ message: "Invalid credentials" })
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" })
    console.log(token)
    res.json({ token, role: user.role })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
