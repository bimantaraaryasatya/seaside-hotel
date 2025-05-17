const { resource, response } = require("../routes/guest.route")

const guestModel = require(`../models/index`).Guest
const Op = require(`sequelize`).Op

exports.getAllGuest = async (request, response) => {
    try {
        let guests = await guestModel.findAll()
        // Cek jumlah guest
        if(guests.length === 0){
            return response.json({
                status: false,
                message: `No data to load`
            })
        }
        return response.json({
            status: true,
            data: guests,
            message: `All guests have been loaded`
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.findGuest = async (request, response) => {
    let keyword = request.body.keyword
    try {
        let guests = await guestModel.findAll({
            where: {
                [Op.or] : [
                    {full_name: { [Op.substring]: keyword }},
                    {email: { [Op.substring]: keyword }},
                    {phone: { [Op.substring]: keyword }},
                    {address: { [Op.substring]: keyword }},
                ]
            }
        })

        if(guests.length === 0){
            return response.json({
                success: false,
                message: `No data to load`
            })
        }

        return response.json({
            success: true,
            data: guests,
            message: `Guest has been loaded`
        })
    } catch (error) {
        return resource.status(500).json({
            success: false,
            message: error.message
        })
    }
}