const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mongoose = require('mongoose');

module.exports = async function(req, res, next){
    if(!req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized'});
    }

    const token = req.headers.authorization.split(' ')[1];
    console.log(token);

    if(!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    try{ 
        const decoded = jwt.verify(token, 'secretxd');
        console.log(decoded)
        console.log(decoded.userId)

        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(400).json({ message: 'User does not exist'})
        }

        req.user = user;

        next();
    } catch(err){
        res.status(401).json({ message: 'Invalid token'})
    }
}