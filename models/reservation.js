const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ReservationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    time: {
        type: String,
        requred: true
    },
    notified: {
        type: Boolean,
        required: false
    }
});

module.exports = Reservation = mongoose.model('reservation', ReservationSchema)