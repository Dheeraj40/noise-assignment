const mongoose = require('mongoose');

const SleepRecordSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('SleepRecord', SleepRecordSchema);
