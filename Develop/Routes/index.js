const express = require('express');

const notesRouter = require('../routes/notesRouter');
// const savedNotes = require('../routes/savedNotes');

const app = express();


app.use('/notes', notesRouter);
// app.use('/savedNotes', savedNotes);



module.exports = app;