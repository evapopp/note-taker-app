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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {res.json(notes)
});

app.post('/api/notes', (req, res) => {
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    };
    notes.push(newNote)
    res.json(notes);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => err ? console.log(err) : console.log("You made a new note!"));
});


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });