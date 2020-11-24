const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors');
const Reservation = require('../../models/reservation');

const reservations = require('./routes/api/reservations')

const app = express();

// Bodyparser Middleware
app.use(cors({
    origin: 'https://virtualline-api.herokuapp.com'
}));
app.use(bodyParser.json());

// Database config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use("/api/reservations", reservations)

// "/" Route
app.get("/", (req, res) => {
    console.log("Respoding to root request");
    res.send("Hello from the other side");
});

app.post("/reservation/post", (req, res) => {
    const newReservation = new Reservation({
        name: req.body.name,
        size: req.body.size,
        time: req.body.time,
        notified: req.body.notified
    })
    newReservation.save().then(reservation => res.json(reservation))
});

// Port Connection 
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
