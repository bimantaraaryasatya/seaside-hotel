const paymentModel = require('../models/index').Payment
const reservationModel = require('../models/index').Reservation 

exports.getAllPayments = async (request, response) => {
    try {
        const payments = await paymentModel.findAll({include: [{model: reservationModel, as: 'reservation'}]})
        if(payments.length === 0){
            return response.status(404).json({
                status: false,
                message: 'Payments not found'
            })
        }
        return response.status(200).json({
            status: true,
            message: 'Payments have been loaded',
            data: payments
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.createPayment = async (request, response) => {
    try {
        const { reservation_id, amount, method } = request.body
        const payment = await paymentModel.create({
            reservation_id,
            amount,
            payment_method: method,
            status: 'pending'
        })
        return response.status(201).json({
            status: true,
            message: 'Payment has been recorded',
            data: payment
        })
    } catch (error) {
        return response.status(500).json({
            error: error.message
        })
    }
}