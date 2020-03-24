// Import database/models
const db = require("../models/index");

module.exports = {

    // Update user information in db
    updateUser: data => {
        let values = {};

        if (data.username) {
            values.username = data.username;
        }

        if (data.password) {
            values.password = data.password;
        }

        if (data.profile_pic) {
            values.profile_pic = data.profile_pic;
        }

        return db.User.findByIdAndUpdate(data.uuid, values);
    }

};