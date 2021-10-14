const express = require('express');
const multer = require('multer');
const imageRouter = express.Router();

const { databaseClient } = require('../db/database');
const Image = require('../models/image');

const upload = multer({
  limits: {
    fileSize: 10000000 // max file size 10MB = 10000000 bytes
  },

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
      cb(new Error('only upload files with jpg or jpeg format.'));
    }

    cb(undefined, true); // continue with upload
  }
});

imageRouter.get('/:image_id', async (req, res) => {
    try {
        if (!req.params['image_id']) {
            res.status(301).send('No parameter for search. Bad request.');
        }

        const by_id = await databaseClient.db('GuiaDoUniversitario').collection('images').findOne({ post_id: req.params['image_id'] });

        if (by_id) {
            res.set('Content-Type', 'image/jpeg');
            res.status(200).send(result.photo);
        } else {
            res.status(404).send('Not Found');
        }
    } catch (error) {
        //
    }
});

imageRouter.post('/upload', upload.single('image'), async (req, res) => {
	try {
		const img = new Image(req.body);

		const file = req.file.buffer;

		img.img = file;

		await img.save();

		databaseClient.db('GuiaDoUniversitario').collection('images').insertOne(img, (err, response) => {
			if (err) {
				res.status(300);
			} else {
				res.status(200);
			}
			
			res.json(response);
		});

	} catch (error) {
		//
	}
});

module.exports = {
	imageRouter,
}