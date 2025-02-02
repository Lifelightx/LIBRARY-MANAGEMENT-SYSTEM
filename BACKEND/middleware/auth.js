const jwt = require("jsonwebtoken")

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

exports.isUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Access denied. User only." })
  }
  next()
}

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." })
  }
  next()
}

