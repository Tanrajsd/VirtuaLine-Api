const express = require('express');
const router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;

var step = 0;

// Reservation Model
const Reservation = require('../../models/reservation');

// @route   POST api/reservations
// @desc    Create a reservation
// @access  Public (ALSO NEEDS NGROK PORITNG OR LIVE SERVER FOR TESTING/USE)
router.post("/", (req, res) => {
    // TODO IMPLEMENT STEPPER
    step++;
    console.log(step);
    const textMessage = req.body.Body
    console.log(textMessage)

    const twiml = new MessagingResponse();

    twiml.message('Fact: Tanraj is better at ball than Shubh!');

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

module.exports = router;
