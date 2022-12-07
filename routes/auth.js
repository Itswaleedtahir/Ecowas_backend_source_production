const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require("express");
const router = express.Router();
const users = require('../models/users');

// Login in a user
router.post('/', async (req, res) => {
    // Validate

    // Check if email is valid?
    let user = await users.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).send('Invalid email or password.');
    
    // Check if password is valid?
    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
    
    // Generate JWT Token
    const token = jwt.sign({ 
        id: user.id, 
        firstname: user.firstname, 
        lastname: user.lastname, 
        email: user.email,
        imgslug: user.imgslug,
    }, process.env.jwtPrivateKey);
    res.send(token);
});

module.exports = router;