const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');
const { connectDataBase, databaseClient } = require('./db/database');

const PORT = process.env.PORT || 8080;

const app = express();
connectDataBase();

app.use(cors());
app.use(body_parser.json())

app.use('/api/', require('./api'));

app.get('/*', (req, res) => {
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.status(200).send('Finished');
});

app.listen(PORT, () => {
    console.log(`Now listening to port ${PORT}!`);
});