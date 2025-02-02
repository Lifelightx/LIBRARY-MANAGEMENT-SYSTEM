const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const fs = require("fs");
const path = require("path");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}


dotenv.config()

const app = express()

// Connect to database
connectDB()



app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", require("./Routes/authRoutes"))
app.use("/api/books", require("./routes/bookRoute"))
app.use("/api/users", require("./routes/userRoute"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
