const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors');
const index = require('./routes/api/index')
const reservations = require('./routes/api/reservations')
const sms = require('./routes/api/sms')

const app = express();

// Bodyparser Middleware OR Heroku Bodyparser Middleware
app.use(cors({
    // origin: 'https://virtualline-api.herokuapp.com'
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Database config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use("/api/reservations", reservations)
app.use("/api/reservations/sms", sms)
app.use("/", index)

// PORT Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is up and listening");
});
