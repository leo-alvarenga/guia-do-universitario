const postRouter = require('express').Router();

const { databaseClient } = require('../../db/database');

const { statusCode, DB_NAME, POST_COLLECTION_NAME } = require('../util');

// get all posts
postRouter.get('/', async (req, res) => {
    try {
        const posts = await databaseClient.db(DB_NAME).collection(POST_COLLECTION_NAME).find({}).toArray();

        if (posts) {
            res.status(statusCode.OK).json({ posts });
        } else {
            res.status(statusCode.NOT_FOUND).send('No posts');
        }
    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send('Failed');
    }
    
});

// get a single post, using a search term that must be either the post_id or the title of the post
postRouter.get('/:search_term', async (req, res) => {
    const search_term = req.params['search_term'];

    try {
        const by_id = await databaseClient.db(DB_NAME).collection(POST_COLLECTION_NAME).findOne({ post_id: search_term });
        const by_title = await databaseClient.db(DB_NAME).collection(POST_COLLECTION_NAME).findOne({ title: search_term });

        if (by_id) {
            res.status(statusCode.OK).json({ id_search: by_id });
        } else if (by_title) {
            res.status(statusCode.OK).json({ title_search: by_title });
        } else {
            res.status(statusCode.NOT_FOUND).send('Not Found');
        }
    } catch (error) {
        res.status(statusCode.BAD_REQUEST).send('Failed');
    }
});

postRouter.post('/new', async (req, res) => {
    const body = req.body;

    if (body) {
        try {
            const count = await databaseClient.db(DB_NAME).collection(POST_COLLECTION_NAME).countDocuments();

            const new_post = {
                post_id: count.toString(),
                ...body,
            };

            await databaseClient.db(DB_NAME).collection(POST_COLLECTION_NAME).insertOne(new_post);

            res.status(statusCode.CREATED).send('Ok');
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).send('Post failed');
        }
    } else {
        res.status(statusCode.FORBIDDEN).send('Post failed');
    }
});

postRouter.put(('/update'), async (req, res) => {
    if (req.body) {
        const body = req.body;
        
        try {
            const query = { 'post_id': `${body.post_id}`  };
            const { _id, ...post } = body;
            
            const postQuery = { $set: { ...post } };
    
            await databaseClient.db(DB_NAME).collection(POST_COLLECTION_NAME).updateOne(query, postQuery);
            
            res.status(statusCode.OK).send('Ok');
        } catch (error) {
            res.status(statusCode.NOT_ACCEPTABLE).send('It does not seem like the post wanted exists...');
        }
    } else {
        res.status(statusCode.BAD_REQUEST).send('Failed');
    }
});


module.exports = postRouter;