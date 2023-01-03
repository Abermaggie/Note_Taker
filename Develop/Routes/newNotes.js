const router = require('express').Router();

const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const noteid = require('../helpers/noteid');

router.get('/', (req, res) => {
    console.info(`${req.method} request received for a note`);

    readFromFile('.db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/', (req, res) => {
    console.info(`${req.method} request received to submit a note`);

    const { title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, '.db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting new note');
    }
});

module.exports = newNotes;