const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors');

const reservations = require('./routes/api/reservations')

const app = express();

// Bodyparser Middleware
app.use(cors({
    // origin: 'https://virtualline-api.herokuapp.com'
    origin: 'http://localhost:5000'
}));
app.use(bodyParser.urlencoded({ extended: false }));

// Database config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use("/api/reservations", reservations)

// Index page route
app.get("/", (req, res) => {
    console.log("Respoding to root request");
    res.send("Hello from the other side");
});

// PORT Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is up and listening");
});
