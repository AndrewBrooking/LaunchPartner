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

        if (data.photo) {
            values.photo = data.photo;
        }

        if (data.description) {
            values.description = data.description;
        }

        return db.User.findByIdAndUpdate(data.uuid, values);
    }

};