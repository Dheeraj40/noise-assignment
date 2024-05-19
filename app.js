const express = require('express');
const bodyParser = require('body-parser');
const SleepRecord = require('./SleepRecord');


const app = express();


app.use(bodyParser.json());

app.post('/sleep', async(req, res)=>{
    const { userId, hours, timestamp } = req.body;

    if (!userId || !hours || !timestamp) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (typeof hours !== 'number' || hours <= 0) {
        return res.status(400).json({ error: 'Hours must be a positive number' });
    }

    try{
        // save
        // const data = await SleepRecord.find();
        // console.log(data);
        const newRecord = new SleepRecord({
            userId,
            hours,
            timestamp,
        });
        await newRecord.save();

        res.status(201).json(newRecord);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get("/sleep/:userId", async(req, res)=>{
    const { userId } = req.params;
    try{
        const data = await SleepRecord.find({userId}).sort({timestamp:-1});
        res.status(200).json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
})

app.delete("/sleep/:recordId", async(req, res)=>{
    const { recordId } = req.params;
    try{
        // const data = await SleepRecord.deleteOne({_id:recordId});
        const data = await SleepRecord.findById(recordId);
        // if record does not exit response with error
        if (!data) {
            return res.status(404).json({ error: 'Record not found' });
        }
        await SleepRecord.deleteOne({_id:recordId});
        res.status(200).json({_id: recordId, success: true});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
})

module.exports = app;