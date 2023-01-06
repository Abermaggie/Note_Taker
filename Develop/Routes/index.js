// import express library//
const express = require('express');
// import notesRouter page.//
const notesRouter = require('../routes/notesRouter');

// call express app//
const app = express();

// any paths in notesRouters should fall under the notes page of the app.//
app.use('/notes', notesRouter);


// export app//
module.exports = app;