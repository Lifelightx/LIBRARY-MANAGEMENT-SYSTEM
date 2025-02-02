const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")


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
