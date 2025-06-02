const express = require('express')
const app = express()
app.use(express.json())
const userController = require(`../controllers/user.controller`)
const { authenticateToken, authorizeRoles } = require(`../middleware/auth.middleware`)

app.get("/", userController.getAllUser)
app.post("/find", userController.findUser)
app.put("/:id", userController.updateUser)
app.delete("/:id", userController.deleteUser)

module.exports = app