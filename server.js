// Imports
const express = require("express");
const session = require("express-session");
const redis = require("redis");
const redisStore = require("connect-redis")(session);
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");

// Constants
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/launch_partner_db";
const SESSION_NAME = "lp-sid";
const SESSION_LIFE = 1000 * 60 * 60;
const SECRET = "NOT_SECURE_lp-secret";
const REDIS_URI = process.env.REDIS_URL || "redis://localhost:6379";

const storage = multer.diskStorage({ dest: "uploads" });
const upload = multer({ storage }).single("photo");
const client = redis.createClient(REDIS_URI);

// Express App
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  name: SESSION_NAME,
  secret: SECRET,
  store: new redisStore({ client: client }),
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: SESSION_LIFE,
    sameSite: true
  }
}));

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to mongo DB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// Import API routes
require("./app/routes/getRoutes")(app);
require("./app/routes/postRoutes")(app, upload);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/"));
});

// Setup server listener
app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});