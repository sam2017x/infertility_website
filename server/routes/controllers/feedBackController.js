'use strict'
const mongoDb = require('mongodb');
const logger = require('../../logger');
const Auth = require('./authController');
const db = require('../../env/db');

exports.add_feedback = async (req, res, err) => {
    try {
        const collection = await loadFeedback();
        await collection.insertOne({ name: req.body.name, message: req.body.message, createdAt: new Date().toISOString() });
        res.status(200).json('Feedback added.');
        logger.logResponse(req.id, req.body, 200);
    } catch (error) {
        res.status(400).json(error.message);
        logger.logResponse(req.id, error, 400);
    }
}

exports.list_feedback = async (req, res, err) => {
    try {
        const collection = await loadFeedback();
        const feedBack = await collection.find({}).toArray();
        res.status(200).json(feedBack);
        logger.logResponse(req.id, req.body, 200);
        
    } catch (error) {
        res.status(400).json(error.message);
        logger.logResponse(req.id, error, 400);
    }
}

exports.delete_feedback = async (req, res, err) => {
    try {
        const collection = await loadFeedback();
        await collection.deleteOne({ _id: new mongoDb.ObjectID(req.params.id) });
        res.sendStatus(204);
        logger.logResponse(req.id, req.body, 200);
    } catch (error) {
        res.status(400).json(error.message);
        logger.logResponse(req.id, error, 400);
    }
}

async function loadFeedback() {
    const client = await mongoDb.MongoClient.connect(db.address,  { useNewUrlParser: true });
    return client.db(db.name).collection(db.collections.feedback);
}