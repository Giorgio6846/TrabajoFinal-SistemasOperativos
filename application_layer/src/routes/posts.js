const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const Post = require('../models/posts')

router.post('/posts',
    [auth, [check('description', 'Description is required').not().isEmpty()]],
    async(req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ message: 'Invalid inputs'});
        }
        //TODO UPLOAD IMAGE TO BUCKET
        tags = "1"
        namefileFromBucket="owo"

        try {
            const post = new Post({
                author: req.username.id,
                namefileFromBucket: namefileFromBucket,
                description: req.body.description,               
            });

            await post.save();

            res.json({
                id:post.id,
                description: post.description,
                createdAt: post.createdAt,
                namefileFromBucket: post.namefileFromBucket,

            });
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

module.exports = router