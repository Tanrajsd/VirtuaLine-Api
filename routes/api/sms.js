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

    // Send the customer a message back
    // TODO IMPLEMENT STEPPER 
    step++;
    console.log(step);
    const textMessage = new String(req.body.Body)
    console.log(req)

    const twiml = new MessagingResponse();

    twiml.message('Fact: Tanraj is better at ball than Shubh!');

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());

    // Save the customer to the database
    // Use stepper to implement TBDs
    const newReservation = new Reservation({
        name: textMessage,
        size: "TBD",
        time: "TBD",
        notified: false
    })
    newReservation.save()
});

module.exports = router;
