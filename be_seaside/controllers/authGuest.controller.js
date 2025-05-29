const guestModel = require(`../models/index`).Guest 
const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)

const register = async (request, response) => {
    try {
        const { name, email, password, phone, address } = request.body
        const hashedPassword = await bcrypt.hash(password, 10)

        const existingEmail = await guestModel.findOne({where: {email}})
        if(existingEmail){
            return response.status(400).json({message: "Email already exists"})
        }

        const guest = await guestModel.create({full_name: name, email, password: hashedPassword, phone, address})
        response.status(201).json({message: "Guest registred!", guest})
    } catch (error) {
        response.status(500).json({error: error.message})
    }
}

const login = async (request, response) => {
    try {
        const { email, password } = request.body
        const guest = await guestModel.findOne({where: {email}})
        if (!guest) {
            return response.status(401).json({error: "Invalid credentials"})
        }

        const validPassword = await bcrypt.compare(password, guest.password)
        if (!validPassword) {
            return response.status(401).json({error: "Invalid credentials"})
        }

        const token = jwt.sign({id: guest.id, name: guest.full_name, email: guest.email}, process.env.JWT_SECRET, {expiresIn: "1h"})
        response.json({
            data: guest,
            message: "Login successful",
            token: token
        })
    } catch (error) {
        response.status(500).json({error: error.message})
    }
}

module.exports = { register, login }