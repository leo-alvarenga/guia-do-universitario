const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./documentation/swagger.json');

const { connectDataBase, databaseClient } = require('./db/database');

const PORT = process.env.PORT || 8080;

const app = express();
connectDataBase();

app.use(cors());
app.use(body_parser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/', require('./routes'));

app.get('/*', (req, res) => {
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.status(200).send('Finished');
});

app.listen(PORT, () => {
    console.log(`Now listening to port ${PORT}!`);
});