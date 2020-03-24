// Import database/models
const db = require("../models/index");

module.exports = {

    // Create new user
    newUser: data => {
        return db.User.create({
            email: data.email,
            username: data.username,
            password: data.password,
            profile_pic: data.profile_pic,
            joined: Date.now()
        });
    }
    
};