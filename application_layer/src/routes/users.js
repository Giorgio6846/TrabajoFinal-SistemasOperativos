const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const User = require('../models/user')

router.post('/register', async(req,res) =>{
    const user = new User({name, email, password});
    await user.save();

    res.json(user);
});

router.get('/user', auth, async (req,res) =>{
    try {
        const userId = req.user.
    }
})

module.exports = router