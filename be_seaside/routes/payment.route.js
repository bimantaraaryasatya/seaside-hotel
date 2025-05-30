const express = require('express')
const app = express()
app.use(express.json())
const paymentController = require('../controllers/payment.controller')

app.get("/", paymentController.getAllPayments)
app.post("/", paymentController.createPayment)

module.exports = app