const tagRouter = require('express').Router();

const { databaseClient } = require('../../db/database');
const authUser = require('./auth');
const { statusCode, DB_NAME, TAG_COLLECTION_NAME } = require('../util');

const isTagAvailable = async (tag) => {
    try {
        const by_id = await  databaseClient.db(DB_NAME).collection(TAG_COLLECTION_NAME).findOne({ tag_id: tag });
        const by_name = await databaseClient.db(DB_NAME).collection(TAG_COLLECTION_NAME).findOne({ name: tag });

        if (by_id || by_name) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

tagRouter.get('/', async (req, res) => {
    try {
        const tags = await databaseClient.db(DB_NAME).collection(TAG_COLLECTION_NAME).find({}).toArray();

        if (tags) {
            res.status(statusCode.OK).json({ tags });
        } else {
            res.status(statusCode.NOT_FOUND).send('No tags');
        }
    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send('Failed');
    }
});

tagRouter.post('/new', async (req, res) => {
    const body = req.body;

    if (body) {
        try {
            const { username, ...tag } = body;

            const auth = await authUser(username);

            if (auth === statusCode.OK) {
                const count = await databaseClient.db(DB_NAME).collection(TAG_COLLECTION_NAME).countDocuments();

                const new_tag = {
                    tag_id: count.toString(),
                    ...tag,
                };

                await databaseClient.db(DB_NAME).collection(TAG_COLLECTION_NAME).insertOne(new_tag);

                res.status(statusCode.CREATED).send('Ok');
            } else {
                res.status(auth).send(`Failed with code ${auth}.`);
            }
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).send('Post failed');
        }
    } else {
        res.status(statusCode.FORBIDDEN).send('Post failed');
    }
});

module.exports = {
    isTagAvailable,
    tagRouter,
};