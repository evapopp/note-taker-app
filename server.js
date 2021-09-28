const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');

const PORT = 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// get route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/notes', (req, res) => {res.json(notes)
    console.info('this was a get req')
});

app.post('/api/notes', (req, res) => {
    res.json(`POST request received`);
    res.json(req.body);
    const newNote = {
        title: req.body.title,
        text: req.body.text
    }
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes))
    // notes.push(req.body);
    // console.info(notes)
    // fs.writeFile('./db/db.json', JSON.stringify(notes), (err) =>
    //     err ? console.log(err) : console.log('success'));
    
    // console.info(`${req.method} request received`);
});





app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });