// This will be the jumping off point for file direction and starting the port to listen//

const express = require('express');
const path = require('path');
const api = require('./routes/index');
// This allows heroku to decide whether to use the 3001 port or another port.//
const PORT = process.env.PORT || 3001;
// Call express//
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// anything with the api route under app variable from above should 
// show in the url as /api.//
app.use('/api', api);
app.use(express.static('public'));

// html for the /notes path in the URL will be the notes.html//
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
//html for opening page will be index.html//
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// Listen for server interaction//
app.listen(PORT, () =>
    console.log(`Application listening at http://localhost:${PORT}`)
);