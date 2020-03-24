// Import database/models
const db = require("../models/index");

module.exports = {

    // Obtain user via UUID
    getUserByUUID: uuid => {
        return db.User.findById(uuid, "-password");
    },

    // Obtain user via email
    getUserByEmail: email => {
        return db.User.findOne({email: ("" + email).toLowerCase()}, "-password");
    },

    // Obtain user(s) via username
    getUserByUsername: term => {
        return db.User.find({username: new RegExp(term, "i")}, "-password");
    },

    // Obtain user data for login processing
    getUserForLogin: username => {
        return db.User.findOne({username: new RegExp(username, "i")});
    }
};