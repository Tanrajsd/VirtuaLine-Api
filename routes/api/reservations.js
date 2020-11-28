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
    let date = new Date().toLocaleTimeString()
    let rawDate = new Date().now()
    const newReservation = new Reservation({
        name: req.body.name,
        size: parseInt(req.body.size),
        time: date,
        rawTime: rawDate,
        phoneNumber: req.body.phoneNumber
    })
    newReservation.save()
        .catch((err) => console.log(err))
});

// @route   DELETE api/reservations
// @desc    Delete a reservation
// @access  Public
router.delete("/", (req, res) => {
    let id = req.body.id
    Reservation.deleteOne({ "_id": ObjectId(id) })
        .then(reservation => res.json(reservation)).catch((err) => console.log(err));
})

// @route   PUT api/reservations
// @desc    Edit a reservation
// @access  Public
router.put("/", (req, res) => {
    console.log("ran")
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