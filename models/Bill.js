const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    billType: String,
    amount: Number,
    mobile: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bill', billSchema);
