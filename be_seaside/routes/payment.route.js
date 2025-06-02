const express = require('express')
const app = express()
app.use(express.json())
const paymentController = require('../controllers/payment.controller')
const { authenticateToken, authorizeRoles } = require(`../middleware/auth.middleware`)

app.get("/", authenticateToken, paymentController.getAllPayments)
app.post("/", authenticateToken, paymentController.createPayment)

module.exports = app