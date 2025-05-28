const { where } = require("sequelize")
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
        return response.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateGuest = async (request, response) => {
    try {
        let dataGuest = {
            full_name: request.body.name,
            email: request.body.name,
            phone: request.body.phone,
            address: request.body.address
        }
    
        let idGuest = request.params.id
    
        guestModel.update(dataGuest, {where: {id: idGuest}})
            .then(result => {
                return response.json({
                    success: true,
                    data: dataGuest,
                    message: "Data guest has been updated"
                })
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    } catch (error) {
        response.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteGuest = async (request, response) => {
    try {
        let idGuest = request.params.id
    
        const deleteGuest = guestModel.destroy({where: {id: idGuest}})
        if (deleteGuest) {
            return response.json({
                success: true,
                message: "Data guest has been deleted"
            })
        }
    } catch (error) {
        response.status(500).json({
            success: false,
            message: error
        })
    }
}