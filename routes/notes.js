const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// Get route for notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Post route to add new note
notes.post('/', (req, res) => {

    if (req.body.title) {
        console.log(req.body);
        const { title, text } = req.body;

        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.json('Error adding note');
    }
});

notes.delete('/:id', (req, res) => {
    const { id } = req.params;
    const data = readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

module.exports = notes;