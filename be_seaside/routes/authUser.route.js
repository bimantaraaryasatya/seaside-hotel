const express = require("express")
const { login, register } = require("../controllers/authUser.controller")
const app = express()
app.use(express.json())

app.post("/register", register)
app.post('/login', login)

module.exports = app;