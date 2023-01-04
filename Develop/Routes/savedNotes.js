const fs = require('fs');
const util = require('util');
const dataBase = require('../db/db.json');
const router = require('express').Router();

// router.get('/', (req, res) => {
//     console.info(`${req.method} request received for a note`);
//     readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

//     const { title, text, note_id} = req.body;
// });

console.log(fetch('/api/notes'))



