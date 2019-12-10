'use strict'
const formula = require('../../models/formula');
const mongoDb = require('mongodb');
const logger = require('../../logger');
const Auth = require('./authController');
const db = require('../../env/db');


exports.get_probabilities = async (req, res, err) => {
    try {
        const probabilities = await formula.getCumulativeProbabilities(req.body.stimulations, req.body.diagnosis);
        logger.logResponse(req.id, req.body, 200);
        res.status(200).json(probabilities);

        const documents = probabilities[3].map((probability, index) => {
            const stimulation = req.body.stimulations[index];
            return {
            stimulationId: req.id,
            country: req.ipInfo.country || 'N/A',
            age: stimulation.age,
            dose: stimulation.dose,
            oocytes: stimulation.oocytes,
            cleaving: stimulation.cleaving,
            top: stimulation.top,
            stimulation: stimulation.stimulation,
            probability: probabilities[3][index],
            cumulativeProbability: probabilities[0][index],
            status: req.body.status || 'N/A',
            diagnosis: req.body.diagnosis || 'N/A',
            createdAt: new Date().toISOString()
        }})

        insertDocuments(documents, req.id);          
    } 
    catch (error) {
        res.status(400).send(error.message);
    }
}

exports.add_document = async (req, res, err) => {
    try {
        const data = await loadData();
        await data.insertOne(req.body);
        res.status(200).send('data added.'); 
    } 
    catch (error) {
        res.status(400).send(error.message);
    }
}

exports.get_documents = async (req, res, err) => {
    const cb = (err, authData) => {
        if(err) return false;
        else return true;
    }
    const authorized = await Auth.verify(req, cb);

    if(authorized) {
        try {
            const data = await loadData();
            const limit = req.body.limit || 50;
            const sort = req.body.sort || '';
            const page = req.body.page || 0;
            const filter = req.body.filter || {};
            const documents = await data.find(filter)
                                        .skip(page > 0 ? ((page) * limit) : 0 )
                                        .sort(sort)
                                        .limit(limit).toArray();
            const count = await data.find(filter).count();
            res.status(200).json({ rows: documents, limit: limit, sort: sort, page: page, count: count });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
    else res.sendStatus(403);
}

exports.get_document = async (req, res, err) => {
    try {
        const data = await loadData();
        const document = await data.findOne({ _id: new mongoDb.ObjectID(req.params.id) });
        res.status(200).json(document);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.delete_document = async (req, res, err) => {
    try {
        const data = await loadData();
        await data.deleteOne({ _id: new mongoDb.ObjectID(req.params.id) });
        res.status(200).send(`deleted message with id: ${req.params.id}`);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function insertDocuments(documents, id) {
    try {
        const data = await loadData();
        data.insertMany(documents);           
    } catch (error) {
        logger.logResponse(id, error, 400);
    }
}

async function loadData() {
    const client = await mongoDb.MongoClient.connect(db.address,  { useNewUrlParser: true });
    return client.db(db.name).collection(db.collections.documents);
}