const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server

const port = process.env.PORT || 8080;

const axios = require("axios");
const cheerio = require("cheerio");

// Initialize Express
const app = express();

// Require our routes
const routes = require("./routes")


// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Configure middleware
app.use(routes);


// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperdb"
mongoose.connect(MONGODB_URI);

// Launch App
app.listen(port, function(){
  console.log("Listening on port: " + port);
});