const express = require("express")
const router = express.Router()
const bookController = require("../controllers/bookController")
const { authenticateToken, isAdmin, isUser } = require("../middleware/auth")

router.get("/", bookController.getAllBooks)
router.get("/:id", bookController.getBookByID)
router.post("/", authenticateToken, isAdmin, bookController.addBook)
router.put("/:id", authenticateToken, isAdmin, bookController.updateBook)
router.delete("/:id", authenticateToken, isAdmin, bookController.deleteBook)
router.post("/:id/borrow", authenticateToken, isUser, bookController.borrowBook)
router.post("/:id/return", authenticateToken, isUser, bookController.returnBook)
router.post("/:id/renew", authenticateToken, isUser, bookController.renewBook)
router.post("/:id/reserve", authenticateToken, isUser, bookController.reserveBook)

module.exports = router

