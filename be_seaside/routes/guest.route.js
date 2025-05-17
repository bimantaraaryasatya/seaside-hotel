const express = require('express')
const app = express()
app.use(express.json())
const guestController = require(`../controllers/guest.controller`)

app.get("/", guestController.getAllGuest)
app.post("/find", guestController.findGuest)

module.exports = app