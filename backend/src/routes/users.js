const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const User = require('../models/user')

//Works
router.post('/register', async(req,res) =>{
    const {username, email, password} = req.body;
    const user = new User({username: username, email: email, password: password});
    await user.save();

    res.json(user);
});

//TODO
router.get('/user', auth, async (req,res) =>{
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        const userName = user.name;

        res.json({ name: userName });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router