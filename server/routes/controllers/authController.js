'use strict'
const mongoDb = require('mongodb');
const logger = require('../../logger');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../env/db');
const auth = require('../../env/auth');

const saltRounds = 10;

exports.login = async (req, res, err) => {
    const user = req.body;
    const users = await loadCollection();
    const dbUserInfo = await users.findOne({name: user.name});
    if(!dbUserInfo){
        res.sendStatus(403);
    }
    else {
        const isHashed = await bcrypt.compare(user.password, dbUserInfo.password);
        if(isHashed) {
            jwt.sign({ user: { id: dbUserInfo._id, name: dbUserInfo.name, level: dbUserInfo.level } }, auth.cert, (err, token) =>{
                res.status(200).json({ token: token, level: dbUserInfo.level });
            });
        } 
        else {
            res.sendStatus(403);
        } 
    }
}

async function updatePasswordtoHash(user) {
    const newPasswordHash = await bcrypt.hash(user.password, saltRounds);
    const users = await loadCollection();
    await users.updateOne({ name: user.name }, { $set: { password: newPasswordHash }});
}

exports.update_password = async(req, res, err) => {
    const cb = (err, authData) => {
        if(err) return false;
        else return authData.user;
    }
    const authorized = await this.verify(req, cb);
    if(authorized) {
        try {
            const newPasswordHash = await bcrypt.hash(req.body.newPassword, saltRounds);
            const users = await loadCollection();
            await users.updateOne({ name: authorized.name }, { $set: { password: newPasswordHash }});    
        } catch (error) {
            res.status(400).json(error.message);
        }
        res.status(200).json('password changed.');
    }
    else res.sendStatus(403);
}

async function loadCollection() {
    const client = await mongoDb.MongoClient.connect(db.address,  { useNewUrlParser: true });
    return client.db(db.name).collection(db.collections.users);
}

exports.verify = async (req, cb) => {
    const authorization = req.headers['authorization'];
    const token = authorization ? authorization.split(' ')[1] : undefined;
    if (!token) return false;
    const authorized = await jwt.verify(token, auth.cert, cb);
    return authorized;
}