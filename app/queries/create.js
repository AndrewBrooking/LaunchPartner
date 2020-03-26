// Import database/models
const db = require("../models/index");

module.exports = {

    // Create new user
    newUser: data => {
        return db.User.create({
            email: data.email,
            username: data.username,
            password: data.password,
            photo: data.photo,
            description: data.description,
            joined: Date.now()
        });
    }
    
};