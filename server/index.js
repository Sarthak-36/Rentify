require('dotenv').config()
const express = require('express')
const app = express()
;const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path');

const  colors = require('colors');
const authRoutes = require("./routes/auth.js")
const listingRoutes = require("./routes/listing.js")
const userRoutes = require("./routes/user.js")
// const bookingRoutes = require('./routes/booking.js');


app.use(cors());
app.use(express.json());
// app.use(express.static('uploads'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/auth", authRoutes)
app.use("/properties", listingRoutes)
app.use("/users", userRoutes)
// app.use('/bookings', bookingRoutes);

// Connect to db
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("DB connected Successfully..".bgGreen.white);
  })
  .catch((error) => {
    console.log("Something went wrong while connecting to db : ".bgRed.white, error)
  })

app.get('/', function (req, res) {
  res.status(200).json({
    msg: "Welcome to RENTIFY - Where Renting Meets Simplicity"
  })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is up and running on port: http://localhost:${PORT}`.bgYellow.white)
})
