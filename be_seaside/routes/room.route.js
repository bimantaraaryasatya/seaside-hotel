const express = require('express')
const app = express()
app.use(express.json())
const roomController = require(`../controllers/room.controller`)

app.get("/", roomController.getAllRooms)
app.post("/find", roomController.findRoom)
app.post("/", roomController.createRoom)
app.put("/:id", roomController.updateRoom)
app.delete("/:id", roomController.deleteRoom)

module.exports = app