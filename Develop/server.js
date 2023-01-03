// This will be the jumping off point for file direction and starting the port to listen//

const express = require('express');
const path = require('path');
const api = require('./routes/index')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api', api);
app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
    console.log(`Application listening at http://localhost:${PORT}`)
);