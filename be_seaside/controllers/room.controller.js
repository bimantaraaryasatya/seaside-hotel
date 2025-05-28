const roomModel = require(`../models/index`).Room
const Op = require(`sequelize`).Op

exports.getAllRooms = async (request, response) => {
    try {
        const rooms = await roomModel.findAll()
        if(rooms.length === 0){
            return response.json({
                success: false,
                message: `No data to load`
            })
        }
        return response.json({
            success: true,
            data: rooms,
            message: `All rooms have been loaded`
        })
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.findRoom = async (request, response) => {
    
}

exports.createRoom = async (request, response) => {

}

exports.updateRoom = async (request, response) => {

}

exports.deleteRoom = async (request, response) => {

}