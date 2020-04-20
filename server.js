// require dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require("./db/db.json");

// set up express app
const app = express();
const PORT = 3001;

// set up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up routes

// index.html
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

// notes.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

// api/notes
app.get("/api/notes", function(req, res) {
    res.json(database);
  });

//app.post
//app.delete
app.listen(PORT, function () {
    console.log("Listening on PORT " + PORT);
  });