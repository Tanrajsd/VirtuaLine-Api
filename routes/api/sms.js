const express = require('express');
const router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;

// Reservation Model
const Reservation = require('../../models/reservation');

// @route   POST api/reservations/sms
// @desc    Create a rservation AND send a messsage to the user
// @access  Public (ALSO NEEDS NGROK PORITNG OR LIVE SERVER FOR TESTING/USE)
router.post("/", (req, res) => {
    console.log(req);
    const twiml = new MessagingResponse();

    // req.body.Body is text sent by user, trim removes spaces in the front and back of string and split splits the input by spaces
    var input = req.body.Body.trim().split(" ");
    var response = "";
    if (input.length !== 2) {
        response = 'Sorry this input is invalid please make sure there is a space between the Name and Party size! Ex: "Claude 4" ';
    }
    else if (typeof input[0] !== 'string') {
        response = 'Sorry this input is invalid please make sure you put the Name and then the Party size! Ex:"Sid 1" ';
    }
    else if (isNaN(parseInt(input[1]))) { // parseInt returns true if its a invalid number
        response = 'Sorry this input is invalid please make sure you put the Name and then the Party size! Ex: "Schmidt 9" ';
    } else {
        response = "Thank you " + input[0] + ", your group of " + input[1] + " has been added to the queue";
        const newReservation = new Reservation({
            name: input[0],
            size: parseInt(input[1]),
            time: new Date().toLocaleTimeString(),
            rawTime: Date.now(),
            phoneNumber: req.body.From
        })
        newReservation.save()
            .catch((err) => console.log(err))
    }

    twiml.message(response);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

module.exports = router;
