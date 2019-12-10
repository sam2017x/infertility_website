'use strict'
const mongoDb = require('mongodb');
const logger = require('../../logger');
const Auth = require('./authController');
const db = require('../../env/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.list_users = async (req, res, err) => {
    const cb = (err, authData) => {
        if(authData.user.level === 'admin') return true;
        else return false;
    }
    const authorized = await Auth.verify(req, cb);
    if (authorized) {
        try {
            const users = await loadCollection();
            const userList = await users.find({}).toArray();
            const resUsers = userList.map((user) => ({ id: user._id, name: user.name, level: user.level }));
            res.status(200).json(resUsers);
        } catch (error) {
            res.status(400).json(error.message);
        }
    } else res.sendStatus(403);
}

exports.add_user = async (req, res, err) => {
    const cb = (err, authData) => {
        if(authData.user.level === 'admin') return true;
        else return false;
    }
    // const authorized = await Auth.verify(req, cb);
    const authorized = true;
    if (authorized) {
        try {
            const newUser = req.body.newUser;
            const newPasswordHash = await bcrypt.hash(newUser.password, saltRounds);
            newUser.password = newPasswordHash;
            const users = await loadCollection();
            users.insertOne(newUser);
            res.status(200).send('Added user.');
            logger.logResponse(req.id, req.body, 200);
        } 
        catch (error) {
            res.status(400).send(error.message);
            logger.logResponse(req.id, error, 400);
            console.log(error);
        }
    }
    else res.sendStatus(403);
}

exports.delete_user = async (req, res, err) => {
    const cb = (err, authData) => {
        if(authData.user.level === 'admin') return true;
        else return false;
    }
    const authorized = await Auth.verify(req, cb);
    
    if(authorized) {
        try {
            const users = await loadCollection();
            users.deleteOne({_id: new mongoDb.ObjectID(req.params.id)});
            res.status(200).json('deleted user');
            logger.logResponse(req.id, req.body, 200);
        } catch (error) {
            res.status(400).json(error.message);
            logger.logResponse(req.id, error, 400);
        }
    }
    else res.sendStatus(403);
}

async function loadCollection() {
    const client = await mongoDb.MongoClient.connect(db.address,  { useNewUrlParser: true });
    return client.db(db.name).collection(db.collections.users);
}