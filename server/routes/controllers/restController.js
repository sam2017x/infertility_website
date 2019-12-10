'use strict'
const path = require('path');
const appDir = path.dirname(require.main.filename);
const Documents = require('./documentController');
const Auth = require('./authController');
const Users = require('./userController');
const Feedback = require('./feedBackController');

const loadIndex = (req, res, err) => {
    res.sendFile(appDir + '/build/index.html')
}

exports.locations = {
    index: loadIndex,
    documents: Documents,
    auth: Auth,
    users: Users,
    feedback: Feedback
}
