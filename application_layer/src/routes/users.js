const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const User = require('../models/user')

router.post('/register', async(req,res) =>{
    const user = new User({username, email, password});
    await user.save();

    res.json(user);
});

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