const express = require('express');
const { connectDataBase, databaseClient } = require('./db/database');

const PORT = process.env.PORT || 8080;

const app = express();
connectDataBase();

app.use('/api/', require('./api'));

app.get('/*', (req, res) => {
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.status(400).send('Finished');
});

app.listen(PORT, () => {
    console.log(`Now listening to port ${PORT}!`);
});