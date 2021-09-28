const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');
const uuid = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET * should return the index.html file.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
    console.info('this worked!')
});

// GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
    console.info('this also worked!')
});

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {res.json(notes)
    console.info('this was a get req')
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post('/api/notes', (req, res) => {
    console.info('testing this!')
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    };
    notes.push(newNote)
    res.json(notes);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => err ? console.log(err) : console.log("we did it "));
});


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });