const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./documentation/swagger.json');

const path = require("path");

app.use(express.static(path.join(__dirname, '/../client/build')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/build/index.html'));
});

const { connectDataBase, databaseClient } = require('./db/database');

const PORT = process.env.PORT || 8080;

const app = express();
connectDataBase();

app.use(cors());
app.use(body_parser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/', require('./routes'));

app.all('/*', (req, res) => {
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Now listening to port ${PORT}!`);
});