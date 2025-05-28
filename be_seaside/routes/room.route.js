const express = require('express')
const app = express()
app.use(express.json())
const roomController = require(`../controllers/room.controller`)

app.get("/", roomController.getAllRooms)

module.exports = app