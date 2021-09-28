const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// get route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    console.info('this worked!')
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
    console.info('this also worked!')
});


app.get('/api/notes', (req, res) => {res.json(notes)
    console.info('this was a get req')
});


app.post('/api/notes', (req, res) => {
    console.info('testing this!')
    const newNote = {
        title: req.body.title,
        text: req.body.text
    }
    // console.info('notes', notes)
    // console.info('newnote', newNote)
    notes.push(newNote)
    res.json(notes);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => err ? console.log(err) : console.log("we did it "));
});


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });