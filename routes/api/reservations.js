const express = require('express');
const router = express.Router();
var ObjectId = require('mongodb').ObjectID;
const MessagingResponse = require('twilio').twiml.MessagingResponse;


// Reservation Model
const Reservation = require('../../models/reservation');

// @route   GET api/reservations
// @desc    Get All rservations
// @access  Public
router.get("/", (req, res) => {
    Reservation.find()
        .sort({ date: -1 })
        .then(reservations => res.json(reservations))
});

// @route   POST api/reservations
// @desc    Create a reservation
// @access  Public
router.post("/", (req, res) => {
    console.log(req);
    const twiml = new MessagingResponse();
    var flag = true;

    var input = req.body.Body.trim().split(" "); //body.Body is text sent by user, trim removes spaces in the front and back of string and split splits the input by spaces
    var response = "";
    if (input.length !== 2) {
        response = 'Sorry this input is invalid please make sure there is a space between the Name and PartySize like this "Claude 4" ';
    } 
    else if (typeof input[0] !== 'string') {
        response = 'Sorry this input is invalid please make sure you put the Name and then the PartySize like this "Sid 1" ';
    }
    else if (isNaN(parseInt(input[1]))) { // parseInt returns true if its a invalid number
        response = 'Sorry this input is invalid please make sure you put the Name and then the PartySize like this "Schmidt 9" ';
    } else {
        response = "Thank you " + input[0] + " your group of " + input[1] + " has been added to the queue";
        flag = false;
    }
    console.log(parseInt(input[1]));


    // TODO add functionality to give users an estimate of waiting time
    // TODO Add functionaltity to allow users to change their name and partysize using their phonenumber to identify who they are

    twiml.message(response);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());


    if (!flag) {
    const newReservation = new Reservation({
        name: input[0],
        size: input[1],
        time: "0",
        notified: "false"
    })
    newReservation.save()
        .then(reservation => res.json(reservation))
        .catch((err)  => console.log(err))
    }
});

// @route   DELETE api/reservations
// @desc    Delete a reservation
// @access  Public
router.delete("/", (req, res) => {
    // Reservation.findById(req.params.id)
    //     .then(reservation => reservation.remove().then(() => res.json({ success: true })))
    //     .catch(err => res.status(404).json({ success: false }));
    let id = req.body.id
    Reservation.deleteOne( {"_id": ObjectId(id)})
    .then(reservation => res.json(reservation)).catch((err) => console.log(err));
})

// @route   PUT api/reservations
// @desc    Edit a reservation
// @access  Public
router.put("/", (req, res) => {
    const data = {
        notified: req.body.notified
    }
    Reservation.update({ _id: req.body.id }, data, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


module.exports = router;