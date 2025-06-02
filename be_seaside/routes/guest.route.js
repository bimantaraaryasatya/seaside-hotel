const express = require('express')
const app = express()
app.use(express.json())
const guestController = require(`../controllers/guest.controller`)
const { authenticateToken, authorizeRoles } = require(`../middleware/auth.middleware`)


app.get("/",  authenticateToken, authorizeRoles('manager', 'admin', 'receptionist'), guestController.getAllGuest)
app.post("/find", authenticateToken, authorizeRoles('manager', 'admin', 'receptionist'), guestController.findGuest)
app.put("/:id",  authenticateToken, authorizeRoles('admin'), guestController.updateGuest)
app.delete("/:id",  authenticateToken, authorizeRoles('admin'), guestController.deleteGuest)

module.exports = app