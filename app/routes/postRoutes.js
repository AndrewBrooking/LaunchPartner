// Import queries and libraries
const queries = require("../queries/index");
const fs = require("fs");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Constant for bcrypt's hashing method
const SALT_ROUNDS = 10;

module.exports = (app, upload) => {

    // Register new user route
    app.post("/api/register", upload.single("photo"), (req, res) => {
        console.log("Received registration request!");

        // Get user input from request
        let { email, username, password, description } = req.body;
        let profile_pic = {};

        // Sanitize user input
        email = ("" + email).trim().toLowerCase();
        username = ("" + username).trim();
        password = ("" + password).trim();
        description = ("" + description).trim();

        // Process photo upload
        profile_pic.data = fs.readFileSync(req.files.photo);
        profile_pic.contentType = "image/png";

        // Check email is valid and not empty
        if (!validator.isEmail(email) || validator.isEmpty(email)) {
            console.error("Failed to register new user! Error: invalid email");

            return res.status(400).json({
                error: true,
                msg: "Email field must contain a valid email address"
            });
        }

        // Check username does not contain special characters, is between 3 and 16 characters, and is not empty
        if (!validator.isAlphanumeric(username) || !validator.isLength(username, { min: 3, max: 16 }) || validator.isEmpty(username)) {
            console.error("Failed to register new user! Error: invalid username");

            return res.status(400).json({
                error: true,
                msg: "Username field must contain a only letters/numbers and be of length 3-8 characters"
            });
        }

        // Check password is between 8 and 32 characters and is not empty (may contain special characters)
        if (!validator.isLength(password, { min: 8, max: 32 }) || validator.isEmpty(password)) {
            console.error("Failed to register new user! Error: invalid password");

            return res.status(400).json({
                error: true,
                msg: "Password field must be of length 8-32 characters"
            });
        }

        // No need to validate description, anything may be entered in that field

        console.log("Validation Passed! Hashing password...");

        // Hash password for secure storage
        bcrypt.hash(password, SALT_ROUNDS).then(hash => {

            // Store user information to pass to query
            let data = {
                email: validator.normalizeEmail(email),
                username,
                password: hash,
                description,
                profile_pic
            };

            // Run create new user query
            queries.create.newUser(data).then(user => {
                console.log(`Success! New user registered! (${user._id})`);

                // Success, return UUID
                res.status(200).json({
                    error: false,
                    msg: "Success",
                    uuid: user._id
                });

            }).catch(err => {
                console.log(err);

                res.status(500).json({
                    error: true,
                    msg: "POST request failed to register a new user"
                });
            });
        }).catch(err => {
            console.log(err);

            res.status(500).json({
                error: true,
                msg: "POST request failed to secure password"
            });
        });
    });

    // Update user information route
    app.post("/api/user/update", upload.single("photo"), (req, res) => {
        console.log("Received user update request!");

        // Store user information to pass to query
        let data = {};

        // Obtain UUID and sanitize
        let uuid = ("" + req.body.uuid).trim();

        // Check uuid is valid and not empty
        if (!validator.isMongoId(uuid) || validator.isEmpty(uuid)) {
            console.log("Failed to update user! Error: invalid UUID");

            return res.status(400).json({
                error: true,
                msg: "Provided UUID is not valid"
            });
        }

        // Add UUID to data
        data.uuid = uuid;

        // Add username if included in request
        if (req.body.username) {

            // Obtain username and sanitize
            let username = ("" + username).trim();

            // Check username does not contain special characters, is between 3 and 16 characters, and is not empty
            if (!validator.isAlphanumeric(username) || !validator.isLength(username, { min: 3, max: 16 }) || validator.isEmpty(username)) {
                console.error("Failed to update user! Error: invalid username");

                return res.status(400).json({
                    error: true,
                    msg: "Username field must contain a only letters/numbers and be of length 3-8 characters"
                });
            }

            // Add username to data
            data.username = username;
        }

        // Add description if included in request
        if (req.body.description) {

            // Obtain description and sanitize
            let description = ("" + description).trim();

            // No need to validate description, anything may be entered in that field

            // Add description to data
            data.description = description;
        }

        if (req.files.photo) {

            // Variable to store photo
            let profile_pic = {};

            // Process photo upload
            profile_pic.data = fs.readFileSync(req.files.photo);
            profile_pic.contentType = "image/png";

            // Add photo to data
            data.profile_pic = profile_pic;
        }

        console.log("Assembled data and validated! Updating user...");

        // Run update query
        queries.update.updateUser(data).then(user => {
            console.log(`Success! User information updated! (${user._id})`);

            // Success, return UUID
            res.status(200).json({
                error: false,
                msg: "Success",
                uuid: user._id
            });
        }).catch(err => {
            console.log(err);

            res.status(500).json({
                error: true,
                msg: "POST request failed to update user information"
            });
        });
    });

    // Change password route
    app.post("/api/user/security", (req, res) => {
        console.log("Received user password change request!");

        // Get user input from request
        let { uuid, curr_pass, new_pass } = req.body;

        // Sanitize user input
        uuid = ("" + uuid).trim();
        curr_pass = ("" + curr_pass).trim();
        new_pass = ("" + new_pass).trim();

        // Check uuid is valid and not empty
        if (!validator.isMongoId(uuid) || validator.isEmpty(uuid)) {
            console.log("Failed to update password! Error: invalid UUID");

            return res.status(400).json({
                error: true,
                msg: "Provided UUID is not valid"
            });
        }

        // Check new password is between 8 and 32 characters and is not empty (may contain special characters)
        if (!validator.isLength(new_pass, { min: 8, max: 32 }) || validator.isEmpty(new_pass)) {
            console.error("Failed to update password! Error: invalid new password");

            return res.status(400).json({
                error: true,
                msg: "Password field must be of length 8-32 characters"
            });
        }

        console.log("Validation Passed! Updating password...");

        // Find user to compare current password
        queries.read.getUserPassword(uuid).then(user1 => {

            // Compare hashed password
            bcrypt.compare(curr_pass, user1.password).then(match => {

                // Check result matches, if not fail the request
                if (!match) {
                    console.log(`Failed to update password (UUID:${user1._id}): invalid credentials`);

                    return res.status(400).json({
                        error: true,
                        msg: "Invalid credentials"
                    });
                }

                // Hash new password
                bcrypt.hash(new_pass, SALT_ROUNDS).then(hash => {

                    // Update user password in db
                    queries.update.updateUser({ password: hash }).then(user2 => {
                        console.log(`Success! User password updated! (${user._id})`);

                        // Success, return UUID
                        res.status(200).json({
                            error: false,
                            msg: "Success",
                            uuid: user2._id
                        });

                    }).catch(err => {
                        console.log(err);
            
                        res.status(500).json({
                            error: true,
                            msg: "POST request failed to update user password"
                        });
                    });
                }).catch(err => {
                    console.log(err);
        
                    res.status(500).json({
                        error: true,
                        msg: "POST request failed to secure new password"
                    });
                });
            }).catch(err => {
                console.log(err);

                res.status(400).json({
                    error: true,
                    msg: "POST request failed to authenticate password"
                })
            });
        }).catch(err => {
            console.log(err);

            res.status(400).json({
                error: true,
                msg: "POST request failed to find user"
            });
        });
    });

    // Login route
    app.post("/api/login", (req, res) => {
        console.log("Received login request!");

        // Get user input from request
        let { username, password } = req.body;

        // Sanitize user input
        username = ("" + username).trim();
        password = ("" + password).trim();

        // Obtain user using username
        queries.read.getUserForLogin(username).then(user => {

            // Compare password
            bcrypt.compare(password, user.password).then(match => {
                
                // Check if comparison failed
                if (!match) {
                    console.log(`Failed to login (UUID:${user._id}): invalid credentials`);

                    return res.status(400).json({
                        error: true,
                        msg: "Invalid credentials"
                    });
                }

                console.log(`Success! User logged in! (${user._id})`);

                // Success, return UUID
                res.status(200).json({
                    error: false,
                    msg: "Success",
                    uuid: user._id
                });

            }).catch(err => {
                console.log(err);

                res.status(400).json({
                    error: true,
                    msg: "POST request failed to authenticate password"
                });
            });
        }).catch(err => {
            console.log(err);

            res.status(400).json({
                error: true,
                msg: "POST request failed to find user"
            });
        });
    });
};