// import express and create chainable route handler//
const router = require('express').Router();
// import functions from helpers file//
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
// import random id from helpers file//
const noteid = require('../helpers/noteid');
// log that a request is received to read file and bring data back in parsed json form//
router.get('/', (req, res) => {
    console.info(`${req.method} request received for a note`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
// log that a note has been submitted.//
router.post('/', (req, res) => {
    console.info(`${req.method} request received to submit a note`);
    // user deconstructor to pull specific keys out of the submitted body//
    const { title, text, note_id} = req.body;
// reconstruct newNote with this infor.//
    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: noteid(),
        };
// append new Note to JSON file.//
        readAndAppend(newNote, './db/db.json');

        res.json('Note added successfully');
    } else {
        res.error('Error in posting new note');
    }
});

// delete id specified by user input and call delete function//
router.delete('/:id', (req,res) => {
    console.info(`${req.method} request received to delete a note`);
    readAndDelete(req.params.id, './db/db.json');
});

// export files//
module.exports = router;