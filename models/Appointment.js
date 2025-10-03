const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctor: String,
    date: String,
    time: String,
    mobile: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
