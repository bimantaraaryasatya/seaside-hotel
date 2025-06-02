const express = require('express')
const app = express()
app.use(express.json())
const reservationController = require('../controllers/reservation.controller')
const { authenticateToken, authorizeRoles } = require(`../middleware/auth.middleware`)

app.post("/", authenticateToken, reservationController.createReservation)
app.get("/", authenticateToken, reservationController.getAllReservation)

module.exports = app