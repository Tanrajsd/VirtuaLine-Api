const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors');
const Reservation = require('./models/reservation');

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

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    twiml.message('Fact: Tanraj is better at ball than Shubh!');

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

// Port Connection 
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
