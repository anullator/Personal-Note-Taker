// import express
const express = require('express');
const path = require('path');
const api = require('./routes/index');

const PORT = process.env.port || 3003;

// create instance of app
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use('/api', api);

app.use(express.static('public'));

// Get start page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Get notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);