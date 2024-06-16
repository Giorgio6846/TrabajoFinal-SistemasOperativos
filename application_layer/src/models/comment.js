const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//Inserts the comment into the array post
commentSchema.pre('save', async function() {
    try {
        const post = await mongoose.model('Comment').findByIdAndUpdate(
            this.comments,
            { $push: {comments: this._id}},
            { new: true }
        );
    } catch (err) {
        console.error(err)
    }
});
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;
