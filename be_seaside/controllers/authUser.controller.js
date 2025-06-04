const userModel = require(`../models/index`).User
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // cek apakah email sudah ada atau belum, yang artinya email tak boleh sama
        const existingEmail = await userModel.findOne({where: {email}})
        if (existingEmail) {
            return res.status(400).json({message: "Email already exist"});
        }

        const user = await userModel.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ status: true, message: "User registered!", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({where: {email}})
        if(!user){
            return res.status(401).json({error: "Invalid credentials"})
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return res.status(401).json({error: "Invalid credentials"})
        }

        const token = jwt.sign({id: user.id, name:user.name, role: user.role}, process.env.JWT_SECRET, { expiresIn: "24h" })
        res.json({
            status: true,
            data: user,
            message: "Login successful",
            token: token
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { login, register }