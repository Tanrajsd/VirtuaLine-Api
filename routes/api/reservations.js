const express = require('express');
const reservation = require('../../models/reservation');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const router = express.Router();

var step = 0;

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
    step++;
    console.log(step);
    const lies = req.body.Body

    const twiml = new MessagingResponse();

    twiml.message('Fact: Tanraj is better at ball than Shubh!');

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
    // const newReservation = new Reservation({
    //     name: req.body.name,
    //     size: req.body.size,
    //     time: req.body.time,
    //     notified: req.body.notified
    // })
    // newReservation.save().then(reservation => res.json(reservation))
});

// @route   DELETE api/reservations
// @desc    Delete a reservation
// @access  Public
router.delete("/", (req, res) => {
    Reservation.findById(req.params.id)
        .then(reservation => reservation.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
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