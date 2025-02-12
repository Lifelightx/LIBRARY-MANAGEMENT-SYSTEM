const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const { authenticateToken, isAdmin, isUser } = require("../middleware/auth")

router.post("/create", authenticateToken, isAdmin, userController.createUser)
router.put("/:id", authenticateToken, isAdmin, userController.updateUser)
router.delete("/:id", authenticateToken, isAdmin, userController.deleteUser)
router.get("/reserved-books", authenticateToken, userController.getUserReservations);
router.get("/borrowed-books", authenticateToken, isUser, userController.getBorrowedBooks)
router.get("/fines", authenticateToken, isUser, userController.getUserFines)
router.get("/allusers",authenticateToken,isAdmin, userController.allUsers)
module.exports = router

