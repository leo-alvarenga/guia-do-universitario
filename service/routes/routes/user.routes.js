const userRouter = require('express').Router();

const { statusCode, DB_NAME, USER_COLLECTION_NAME } = require('../util');

const { databaseClient } = require('../../db/database');

userRouter.get('/auth/:username', async (req, res) => {
    const username = req.params['username'];

    try {
        const result = await databaseClient.db(DB_NAME).collection(USER_COLLECTION_NAME).findOne({ username });

        if (result === undefined || result === null) {
            res.status(statusCode.NOT_FOUND).send('Not Found');
        } else {
            res.status(statusCode.OK).json({ result });
        }
    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send(error);
    }
});

userRouter.post('/new', async (req, res) => {
    try {
        const body = { ...req.body, ROLE: 'user' };

        await databaseClient.db(DB_NAME).collection(USER_COLLECTION_NAME).insertOne(body);

        res.status(statusCode.CREATED).send('Ok');
    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send('Failed');
    }
});

userRouter.put('/update', async (req, res) => {
    try {
        const body = req.body;

        const query = { 'username': `${body.username}`};
        const { _id, ...user } = body;

        await databaseClient.db(DB_NAME).collection(USER_COLLECTION_NAME).updateOne(query, user);

        res.status(statusCode.OK).send('Ok');
    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send('Failed');
    }
});

module.exports = userRouter;
