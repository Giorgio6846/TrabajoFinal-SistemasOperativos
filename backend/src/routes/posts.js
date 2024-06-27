const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../models/posts');
const AWS = require('aws-sdk');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const User = require('../models/user');

// Middleware for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

AWS.config.update({
    accessKeyId: 'GKbd80ab6f1f5d5fee552d57b2', // Your actual access key
    secretAccessKey: 'd3715a80b2f284b1c24a7d2ef7d8ddb6d5c39d9c56d5ec01a1b24a4af3feb393', // Your actual secret key
    region: 'garage',
    endpoint: 'http://garage:3900',
    s3ForcePathStyle: true
});

const s3 = new AWS.S3();

const uploadToS3Bucket = (image, filePath) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: 'socialmedia-bucket', // Your actual bucket name
            Key: filePath,
            Body: image.buffer, // Note: image.buffer to use the buffer from multer
        };
        console.log(filePath)
        s3.putObject(params, (err, data) => {
            if (err) {
                console.error('Error uploading to S3:', err);
                return reject(err);
            }
            resolve(data);
        });
    });
};

router.post('/posts', 
    [
        auth,
        upload.single('photo'), // Expecting a file field named 'photo'
        [check('description', 'Description is required').not().isEmpty()],
    ],
    async (req, res) => {
        console.log("Post Received");

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ message: 'Invalid inputs', errors: errors.array() });
        }

        const { description } = req.body;
        const photo = req.file;
        console.log(description)

        if (!photo) {
            return res.status(422).json({ message: 'Image not sent' });
        }
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, 'secretxd');
        
        usernameId = decoded.userId
        console.log(usernameId)

        try {
            const post = new Post({
                author: await User.findById(usernameId),
                description: description,
            });

            await uploadToS3Bucket(photo, `${usernameId}/${post.id}/image.jpg`);
            await post.save();

            res.json({
                id: post.id,
                description: post.description,
                createdAt: post.createdAt,
            });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

router.get('/posts', 
    [
        auth,
    ],
    async (req, res) => {
        console.log("Post Received");

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ message: 'Invalid inputs', errors: errors.array() });
        }

        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, 'secretxd');
        
        usernameId = decoded.userId
        console.log(usernameId)

        try {
            const user = await User.findById(usernameId)
            console.log(user._id)

            res.json({
                posts: user.posts
            });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

const getFileFromS3 = (filePath) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: "socialmedia-bucket",
            Key: filePath
        };
        s3.getObject(params, (err, data) => {
            if (err) {
                console.error('Error fetching from S3:', err);
                return reject(err);
            }
            resolve(data);
        });
    });
};

router.post('/post', async (req, res) => {
        console.log("Post Request Received");

        console.log(req.body)

        const { postId } = req.body;
        console.log(postId)

        try {
            const post = await Post.findById(postId)
            console.log(post.description)

            const filePath = `${post.author}/${post._id}/image.jpg`;
            console.log(filePath)
            const fileData = await getFileFromS3(filePath)
            console.log(typeof(fileData))

            const user = await User.findById(post.author)

            res.json({
                description: post.description,
                createdAt: post.createdAt,
                author: user.username
            });

            /*
            const boundary = '----MyBoundary';

            // Set the content type to multipart with the boundary
            res.setHeader('Content-Type', `multipart/mixed; boundary=${boundary}`);

            // Start the multipart body with the JSON data
            let multipartBody = `--${boundary}\r\nContent-Type: application/json\r\n\r\n`;
            multipartBody += JSON.stringify({ description: post.description }) + '\r\n';

            // Add the image file
            multipartBody += `--${boundary}\r\nContent-Type: image/png\r\nContent-Disposition: attachment; filename="image.png"\r\n\r\n`;
            multipartBody += fileData["Body"].toString('binary') + '\r\n';
            multipartBody += `--${boundary}--`;

            // End the multipart body
            res.end(multipartBody, 'binary');
             */
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;