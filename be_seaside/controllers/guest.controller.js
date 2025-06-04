const { where } = require("sequelize")
const guestModel = require(`../models/index`).Guest
const Op = require(`sequelize`).Op

exports.getAllGuest = async (request, response) => {
    try {
        const { search } = request.query;
        const { Op } = require('sequelize');

        // Kalau search ada, filter berdasarkan full_name dengan LIKE
        const guests = await guestModel.findAll({
            where: {
                full_name: {
                    [Op.like]: `%${search ? search.toString() : ''}%`
                }
            }
        });

        return response.status(200).json({
            status: true,
            data: guests,
            message: 'Guests have been retrieved'
        });
    } catch (error) {
        return response.status(400).json({
            status: false,
            message: `There is an error. ${error.message}`
        });
    }
};

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
                status: false,
                message: `No data to load`
            })
        }

        return response.json({
            status: true,
            data: guests,
            message: `Guest has been loaded`
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.updateGuest = async (request, response) => {
    try {
        let dataGuest = {
            full_name: request.body.full_name,
            email: request.body.email,
            phone: request.body.phone,
            address: request.body.address
        }
    
        let idGuest = request.params.id
    
        guestModel.update(dataGuest, {where: {id: idGuest}})
            .then(result => {
                console.log("Update result:", result); // Tambah ini

                if (result[0] === 0) {
                    return response.json({
                        status: false,
                        message: "No data was updated. ID may not exist."
                    })
                }
                return response.json({
                    status: true,
                    data: dataGuest,
                    message: "Data guest has been updated"
                })
            })
            .catch(error => {
                return response.json({
                    status: false,
                    message: error.message
                })
            })
    } catch (error) {
        response.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.deleteGuest = async (request, response) => {
    try {
        let idGuest = request.params.id
        const existingGuest = await guestModel.findOne({where: {id: idGuest}})
        if(!existingGuest){
            return response.status(404).json({
                status: false,
                message: "Guest not found"
            })
        }
        const deleteGuest = guestModel.destroy({where: {id: idGuest}})
        if (deleteGuest) {
            return response.json({
                status: true,
                message: "Data guest has been deleted"
            })
        }
    } catch (error) {
        response.status(500).json({
            status: false,
            message: error
        })
    }
}