const express = require('express')
const app = express()
app.use(express.json())
const roomController = require(`../controllers/room.controller`)
const { authenticateToken, authorizeRoles } = require(`../middleware/auth.middleware`)

app.get("/", authenticateToken, roomController.getAllRooms)
app.post("/find", authenticateToken, roomController.findRoom)
app.post("/", authenticateToken, authorizeRoles('admin'), roomController.createRoom)
app.put("/:id", authenticateToken, authorizeRoles('admin'), roomController.updateRoom)
app.delete("/:id", authenticateToken, authorizeRoles('admin'), roomController.deleteRoom)

module.exports = app