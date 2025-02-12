const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")



exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    // console.log(username,password)
    const user = await User.findOne({ username })
    // console.log(user)
    if (!user || !(password === user.password)) {
      // console.log(await bcrypt.compare(password, user.password))
      return res.status(400).json({ message: "Invalid credentials" })
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET)
    // console.log(token)
    res.json({ token, role: user.role })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
