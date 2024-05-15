const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// Get route for notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Post route to add new note
notes.post('/', (req, res) => {

    if (req.body.title) {
        console.log(req.body);
        const { title, text } = req.body; // gets title and text for note

        const newNote = { // creates new note
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json'); // adds new note to database
        res.json(`Note added successfully`);
    } else {
        res.json('Error adding note');
    }
});

// Delete route to delete a note
notes.delete('/:id', (req, res) => {
    const { id } = req.params; // gets id of note to delete
    readFromFile('./db/db.json')
        .then((data) => {
            let parsedNotes =  JSON.parse(data); // converts to array
            
            // finds note to delete
            const deletedNote = parsedNotes.find(note => note.id === id) 
            if (deletedNote) {
                // removes note from array
                parsedNotes = parsedNotes.filter(notes => notes.id !== id);

                // rewrites database excluding the deleted note
                writeToFile('./db/db.json', parsedNotes)
            } else {
                res.json('Error adding note');
            }
        })
});

module.exports = notes;