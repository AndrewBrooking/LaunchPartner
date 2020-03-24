// Import mongoose
const mongoose = require("mongoose");

// Define model fields and types
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    profile_pic: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String
    },
    joined: {
        type: Date,
        default: Date.now
    }
});

// Create model using schema
const User = mongoose.model("User", UserSchema);

// Export model
module.exports = User;