const roomModel = require(`../models/index`).Room
const Op = require(`sequelize`).Op

exports.getAllRooms = async (request, response) => {
    try {
        const rooms = await roomModel.findAll()
        if(rooms.length === 0){
            return response.status(404).json({
                status: false,
                message: `No data to load`
            })
        }
        return response.status(200).json({
            status: true,
            data: rooms,
            message: `All rooms have been loaded`
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.findRoom = async (request, response) => {
    let keyword = request.body.keyword

    try {
        let rooms = await roomModel.findAll({
            where: {
                [Op.or] : [
                    {room_number: { [Op.substring] : keyword }},
                    {type: { [Op.substring] : keyword }},
                ]
            }
        })

        if(rooms.length === 0){
            return response.status(404).json({
                status: false,
                message: `No data to load`
            })
        }

        return response.status(200).json({
            status: true,
            data: rooms,
            message: "Room has been loaded"
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.createRoom = async (request, response) => {
    try {
        const {room_number, type, price, status} = request.body
        const existingRoom = await roomModel.findOne({where: {room_number}})
        if(existingRoom){
            return response.status(400).json({message: "Room already exists"})
        }
        const newRoom = await roomModel.create({room_number, type, price, status})
        return response.status(200).json({
            status: true,
            data: newRoom,
            message: 'Room has been created'
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            error: message.error
        })
    }
}

exports.updateRoom = async (request, response) => {
    try {
        const idRoom = request.params.id
        const { room_number, type, price, status } = request.body
        
        const room = await roomModel.findByPk(idRoom)
        if(!room){
            return response.status(404).json({
                status: false,
                message: 'Room not found'
            })
        }

        const existingRoom = await roomModel.findOne({where: {room_number}})
        if(existingRoom){
            return response.status(400).json({message: "Room already exists"})
        }

        await room.update({room_number, type, price, status})
        return response.status(200).json({
            status: true,
            message: 'Room has been updated',
            data: room
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            error: error.message
        })
    }
}

exports.deleteRoom = async (request, response) => {
    try {
        const idRoom = request.params.id
        
        const room = await roomModel.findByPk(idRoom)
        if (!room) {
            return response.status(404).json({
                status: false,
                message: 'Room not found'
            })
        }

        await room.destroy()
        return response.status(200).json({
            status: true,
            message: 'Room has been deleted'
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error.message
        })
    }
}