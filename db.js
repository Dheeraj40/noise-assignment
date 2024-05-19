const mongoose = require('mongoose');
const SleepRecord = require('./SleepRecord');

const uri = process.env.MONGODB_URI || "mongodb+srv://user:user_pin@sleepapi.3wenszf.mongodb.net/noise?retryWrites=true&w=majority&appName=SleepApi"; 

const connectDB = async () => {
    try {
        SleepRecord;
        await mongoose.connect(uri, {
            bufferCommands: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
