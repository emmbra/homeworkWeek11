// require dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const databasePath = path.join(__dirname, "/db/db.json");
// uuid generates random ids
const uuid = require('uuid/v4');
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

// return all saved notes in database as JSON
app.get("/api/notes", function(req, res) {
    res.json(database);
  });

//app.post
app.post("/api/notes", function (req, res) {
  // add a random id to each note and save it to database
  const randomID = uuid();
  const newNote = req.body;
  newNote.id = randomID;

  // push new task with random id to database
  database.push(newNote);
  fs.writeFileSync(databasePath, JSON.stringify(database), function(err, data) {
      if (err) throw err;
  })
  res.json(newNote);
});

//app.delete
  // loop through database to find id so note can be deleted

app.listen(PORT, function () {
    console.log("Listening on PORT " + PORT);
  });