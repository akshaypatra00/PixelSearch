const express = require("express")
const app = express()
require("dotenv").config()
const routers = require("./Routers/authRoutes")
app.use(express.json())
const cors = require("cors")
const cookie = require("cookie-parser")

app.use(cookie())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use("/api/auth" ,  routers)










module.exports = app;