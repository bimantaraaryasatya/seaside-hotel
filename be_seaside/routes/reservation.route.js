const express = require('express')
const app = express()
app.use(express.json())
const reservationController = require('../controllers/reservation.controller')

app.post("/", reservationController.createReservation)
app.get("/", reservationController.getAllReservation)

module.exports = app