const reservationModel = require('../models/index').Reservation
const guestModel = require('../models/index').Guest
const roomModel = require('../models/index').Room

exports.createReservation = async (request, response) => {
    try {
        const { guest_id, room_id, check_in, check_out } = request.body

        const existingReservation = await reservationModel.findOne({
            where: {
                room_id,
                status: ['booked', 'checked_in']
            }
        })

        if(existingReservation){
            return response.status(400).json({
                sucess: false,
                message: 'Room is already booked or occupied'
            })
        }

        const reservation = await reservationModel.create({guest_id, room_id, check_in, check_out, status: 'booked'})
        // Update status kamar
        await roomModel.update(
            { status: 'occupied' },
            {where: {id: room_id}}
        )

        return response.status(201).json({
            success: true,
            message: 'Reservation has been created',
            data: reservation
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.getAllReservation = async (request, response) => {
    try {
        const reservation = await reservationModel.findAll({
            include: [
                {model: guestModel, as: 'guest'},
                {model: roomModel, as: 'room'}
            ]
        })
        if(reservation.length === 0){
            return response.status(400).json({
                success: false,
                message: 'Reservations not found'
            })
        }
        return response.status(200).json({
            success: true,
            message: 'Reservations have been loaded',
            data: reservation
        })
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        })
    }
}