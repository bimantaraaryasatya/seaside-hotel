const express = require(`express`)
const app = express()
const PORT = 8000
const cors = require("cors")
app.use(cors())
require('dotenv').config();

const authUser = require(`./routes/authUser.route`)
app.use(`/authUser`, authUser)

const authGuest = require(`./routes/authGuest.route`)
app.use(`/authGuest`, authGuest)

const userRoute = require(`./routes/user.route`)
app.use(`/user`, userRoute)

const guestRoute = require(`./routes/guest.route`)
app.use('/guest', guestRoute)

const roomRoute = require(`./routes/room.route`)
app.use('/room', roomRoute)

const reservationRoute = require(`./routes/reservation.route`)
app.use('/reservation', reservationRoute)

const paymentRoute = require(`./routes/payment.route`)
app.use('/payment', paymentRoute)

app.listen(PORT, () => {
    console.log(`Server of Sea Side Hotel runs on port ${PORT}`);
})