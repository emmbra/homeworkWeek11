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
const PORT = process.env.PORT || 3001;

// express middleware
app.use(express.urlencoded({ extended: true }));
// body parsing
app.use(express.json());
// route for index.js
app.use(express.static("public"));

// route for index.html
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// route for notes.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

// return all saved notes in database as JSON
app.get("/api/notes", function(req, res) {
    res.json(database);
  });

//app.post to add randomID to new note and save to db
app.post("/api/notes", function (req, res) {
  // add a random id to each note and save it to database
  console.log("New note added!");
  const randomID = uuid();
  const newNote = req.body;
  console.log(newNote);
  // set random id for newNote using uuid
  newNote.id = randomID;

  // push newNote with random id to database
  database.push(newNote);
  // console.log(database);
  fs.writeFileSync(databasePath, JSON.stringify(database), function(err, data) {
      if (err) throw err;
  })
  res.json(newNote);
});

//app.delete to delete notes
//use wildcard for id
app.delete("/api/notes/:id", function(req, res) {
    // loop through database to find id so specific note can be deleted
    console.log("Deleted!");
    const databaseID = req.params.id;
    for (let i = 0; i < database.length; i++) {
        if(database[i].id === databaseID) {
            database.splice(i, 1);
        }
    }
    res.json(database);
});

// catch all * wildcard route must always be last declared route
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function () {
    console.log("Listening on PORT " + PORT);
  });