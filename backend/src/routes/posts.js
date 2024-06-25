const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const Post = require('../models/posts')

//TODO
router.post('/posts',
    [auth, [check('description', 'Description is required').not().isEmpty()]],
    async(req,res) => {
        console.log("Post Received")
        
        const errors = validationResult(req);
        console.log(errors)
        if(!errors.isEmpty()) {
            return res.status(422).json({ message: 'Invalid inputs'});
        }

        console.log("2")

        const { description } = req.body
        const photo = req.file

        console.log(req.body)
        console.log(req.file)

        
        if(!photo) {
            return res.status(422).json({ message: 'Invalid inputs'});
        }
        
        if(!description) {
            return res.status(422).json({ message: 'Invalid inputs'});
        }
        
        console.log("Post Sucessful")
        
        //TODO UPLOAD IMAGE TO BUCKET
        tags = "1"
        
        try {
            const post = new Post({
                author: req.username.id,
                description: req.body.description,               
            });
            
            uploadToS3Bucket(photo, `${req.username.id}/${post.id}/image.jpg`)
            await post.save();

            res.json({
                id:post.id,
                description: post.description,
                createdAt: post.createdAt,
            });
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

const uploadToS3Bucket = (image, filePath) => {
    return new Promise((resolve, reject) => {
    
    const bucketName = 'socialmedia-bucket';

    let bucketPath = filePath;

    let params = {
      Bucket: bucketName,
      Key: bucketPath,
      Body: image,
    };
    s3.putObject(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        resolve();
      }
    });
  });

}

module.exports = router