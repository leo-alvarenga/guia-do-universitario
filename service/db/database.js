const { MongoClient, MongoRuntimeError } = require('mongodb');
const mongoose = require('mongoose')
const env = require('dotenv').config('../');

const uri = env.parsed.ATLAS_URI;

const databaseClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDataBase = () => {
    try {
        databaseClient.connect((err, db) => {
            if (db) {
                console.log('Database connected.');
            }
        });
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    connectDataBase,
    databaseClient
};
