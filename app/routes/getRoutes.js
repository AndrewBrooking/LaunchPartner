// Import queries
const queries = require("../queries/index");
const fs = require("fs");
const FormData = require("form-data");

module.exports = app => {
    
    // Queries the database for a user based on their UUID and returns the result to the client
    app.get("/api/users/:uuid", (req, res) => {
        queries.read
          .getUserByUUID(req.params.uuid)
          .then(user => {
            res.json({
              error: false,
              msg: "Success",
              user
            }).sendFile(`./${user.photo}`);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json({
              error: true,
              msg: "GET request could not be processed"
            });
        });
    });
    
    // NOT IN USE
    // // Queries the database for a user based on their email and returns the result to the client
    // app.get("/api/users/search/email=:email", (req, res) => {
    //     queries.read
    //       .getUserByEmail(req.params.email)
    //       .then(user => {
    //         res.json({
    //           error: false,
    //           msg: "Success",
    //           user
    //         });
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         res.status(400).json({
    //           error: true,
    //           msg: "GET request could not be processed"
    //         });
    //     });
    // });

    // Queries the database for all users with similar usernames and returns the result to the client
    app.get("/api/users/search/username=:username", (req, res) => {
        queries.read
          .getUserByUsername(req.params.username)
          .then(user => {
            res.json({
              error: false,
              msg: "Success",
              user
            });
          })
          .catch(err => {
            console.log(err);
            res.status(400).json({
              error: true,
              msg: "GET request could not be processed"
            });
        });
    });
};