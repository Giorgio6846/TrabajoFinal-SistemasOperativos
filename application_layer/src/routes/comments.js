const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')
const Comment = require('../models/comment')

router.post('/comments',
    [auth, [check('description', 'Description is required').not().isEmpty()]],
    async(req, res) => {
        const error = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ message: 'Invalid inputs'});
        }

        try {
            const comment = new Comment({
                author: req.user.id,
                description: req.body.description
            });

            await comment.save();

            res.json({
                id:comment.id,
                author: comment.author,
                description: comment.description,
                createdAt: comment.createdAt
            })
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

module.exports = router