const userModel = require(`../models/index`).User // Nama model harus besar, kalau error cek huruf besar dari nama model
const Op = require(`sequelize`).Op

exports.getAllUser = async (request, response) => {
    try {
        let users = await userModel.findAll() // mendapatkan semua user dengan findAll()
        if(users.length === 0){
            return response.json({
                status: false,
                message: `No data to load`
            })
        }
        return response.json({
        status: true,
        data: users,
        message: `All users have been loaded`
    })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.findUser = async (request, response) => {
    let keyword = request.body.keyword

    try {
        let users = await userModel.findAll({
            where: {
                [Op.or] : [
                    {name: { [Op.substring]: keyword }},
                    {email: { [Op.substring]: keyword }},
                    {role: { [Op.substring]: keyword }}
                ]
            }
        })
        
        if(users.length === 0){
            return response.json({
                status: false,
                message: `No data to load`
            })
        }

        return response.json({
            status: true,
            data: users,
            message: "User has been loaded"
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error.message
        })
    }

}

exports.updateUser = async (request, response) => {
    let dataUser = {
        name: request.body.name,
        email: request.body.email
    }

    let idUser = request.params.id

    userModel.update(dataUser, { where: { id: idUser } })
        .then(result => {
            return response.json({
                status: true,
                data: dataUser,
                message: "Data user has been updated"
            })
        })
        .catch(error => {
            return response.json({
                status: false,
                message: error.message
            })
        })
}

exports.deleteUser = async (request, response) => {
    let idUser = request.params.id

    userModel.destroy({ where: { id: idUser } })
        .then(result => {
            return response.json({
                status: true,
                message: "Data user has been deleted"
            })
        })
        .catch(error => {
            return response.json({
                status: false,
                message: error
            })
        })
}