const router = require('express').Router();
const { imageRouter } = require('./image');

const { databaseClient } = require('../db/database');

// handle images
router.use('/images/', imageRouter);

// get all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await databaseClient.db('GuiaDoUniversitario').collection('posts').find({}).toArray();

        if (posts) {
            res.json({ posts }).status(400);
        }
    } catch (error) {
        // ...
    }
    
});

router.get('/post/:search_term', async (req, res) => {
    const search_term = req.params['search_term'];

    try {
        const by_id = await databaseClient.db('GuiaDoUniversitario').collection('posts').findOne({ post_id: search_term });
        const by_title = await databaseClient.db('GuiaDoUniversitario').collection('posts').findOne({ title: search_term });

        if (by_id) {
            res.status(200).json({ id_search: by_id });
        } else if (by_title) {
            res.status(200).json({ title_search: by_title });
        } else {
            res.status(404).send('Not Found');
        }
    } catch (error) {
        //
    }
});

router.post('/posts/new', async (req, res) => {
    const body = req.body;

    if (body) {
        try {
            const count = await databaseClient.db('GuiaDoUniversitario').collection('posts').countDocuments();

            const new_post = {
                post_id: count.toString(),
                ...body,
            };

            const response = await databaseClient.db('GuiaDoUniversitario').collection('posts').insertOne(new_post);

            console.log('New post', response);

            res.status(200).send('Ok');
        } catch (error) {
            res.status(401).send('Post failed');
        }
    } else {
        console.log(body);
    }
});

router.put(('/posts/update'), async (req, res) => {
    const body = req.body;
    
    try {
        const query = { 'post_id': `${body.post_id}`  };
        const post = { $set: body };

        const response = await databaseClient.db('GuiaDoUniversitario').collection('posts').updateOne(query, post);
        
        res.status(200).send('Ok');
    } catch (error) {
        res.status(301).send('Failed');
        console.log(error);
    }
});

router.get('/posts/tag/:tag', async (req, res) => {
    const tag = req.params['tag'];

    try {
        const tags = await databaseClient.db('GuiaDoUniversitario').collection('tags').find({}).toArray();

        let flag = false;

        tags.forEach((item) => {
            if (item.name.toLowerCase() === tag.toLowerCase()) {
                flag = true;
                return;
            }
        });

        if (flag) {
            const results = await databaseClient.db('GuiaDoUniversitario').collection('posts').find({tags: { $in: tag } });

            if (results){
                res.status(400).json({ results });
            } else {
                flag = false;
            }
        }

        if (!flag) {
            res.status(404).send('Not Found');
        }
    } catch (error) {
        //
    }
});

  
module.exports = router;