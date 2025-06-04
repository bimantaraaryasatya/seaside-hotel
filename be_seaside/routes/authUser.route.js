const express = require("express")
const { login, register } = require("../controllers/authUser.controller")
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware')
const app = express()
app.use(express.json())
const multer = require('multer');
const upload = multer();

app.post("/register", authenticateToken, authorizeRoles('admin'), upload.none(),register)
app.post('/login', login)

module.exports = app;