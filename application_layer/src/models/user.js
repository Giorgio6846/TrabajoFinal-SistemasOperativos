const mongosee = require('mongoose');
const bcrypt =require('bcrypt');
const userSchema = new mongosee.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{ type: mongosee.Schema.Types.ObjectId, ref: 'Post'}]
});

userSchema.pre('save', async function (next) {
    const user = this;
    if(user.isModified('password') || user.isNew) {
        try {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
        } catch (error) {
            return next(error);
        }
    }
    next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;