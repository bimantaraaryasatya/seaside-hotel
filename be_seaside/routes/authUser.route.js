const express = require("express")
const { login, register } = require("../controllers/authUser.controller")
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware')
const app = express()
app.use(express.json())

app.post("/register", authenticateToken, authorizeRoles('admin'), register)
app.post('/login', login)

module.exports = app;