const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ReservationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        requred: true
    },
    rawTime: {
        type: Number,
        requred: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

module.exports = Reservation = mongoose.model('reservation', ReservationSchema)