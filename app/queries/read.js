// Import database/models
const db = require("../models/index");

module.exports = {

    // Obtain user via UUID
    getUserByUUID: uuid => {
        return db.User.findById(uuid);
    },

    // Obtain user(s) via username
    getUserByUsername: term => {
        return db.User.find({username: new RegExp(term, "i")});
    },

    // Obtain user data for login processing
    getUserForLogin: username => {
        return db.User.findOne({username: new RegExp(username, "i")}).select("+password");
    },

    // Obtain user for password verification/change
    getUserPassword: uuid => {
        return db.findById(uuid).select("+password");
    }
};