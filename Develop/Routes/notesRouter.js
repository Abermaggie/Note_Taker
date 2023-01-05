const router = require('express').Router();

const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const noteid = require('../helpers/noteid');

router.get('/', (req, res) => {
    console.info(`${req.method} request received for a note`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/', (req, res) => {
    console.info(`${req.method} request received to submit a note`);

    const { title, text, note_id} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: noteid(),
        };

        readAndAppend(newNote, './db/db.json');

        res.json('Note added successfully');
    } else {
        res.error('Error in posting new note');
    }
});


router.delete('/:id', (req,res) => {
    console.info(`${req.method} request received to delete a note`);
    readAndDelete(req.params.id, './db/db.json');
});
    // res.send('Got a DELETE request at /user')
    // const { title, text, id} = req.body;
    // console.log(req.body);
    // // readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    // console.info("insideDeleteRouter");
    // deleteFile(123);

    // const deleteNote = (note_id) => users.findIndex(u => u.id === parseInt(userId)

module.exports = router;