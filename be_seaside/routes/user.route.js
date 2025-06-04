const express = require('express')
const app = express()
app.use(express.json())
const userController = require(`../controllers/user.controller`)
const { authenticateToken, authorizeRoles } = require(`../middleware/auth.middleware`)
const multer = require('multer');
const upload = multer();

app.get("/", authenticateToken, authorizeRoles('admin', 'manager'), userController.getAllUser)
app.post("/find", authenticateToken, authorizeRoles('admin', 'manager'), userController.findUser)
app.put("/:id", authenticateToken, authorizeRoles('admin'), upload.none(), userController.updateUser)
app.delete("/:id", authenticateToken, authorizeRoles('admin'), userController.deleteUser)

module.exports = app