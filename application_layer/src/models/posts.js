const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    namefileFromBucket: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }],
    amountLikes: {
        type: Number
    }
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
