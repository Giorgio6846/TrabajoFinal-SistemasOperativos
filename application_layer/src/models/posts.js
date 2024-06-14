const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likedBy: [{
        types: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }]
});

postSchema.pre('save', async function() {
    try {
        const user = await mongoose.model('User').findByIdAndUpdate(
            this.author,
            { $push: {posts: this._id}},
            { new: true }
        );
    } catch (err) {
        console.error(err)
    }
});
const Post = mongoose.model('Post', postSchema)

module.exports = Post;
