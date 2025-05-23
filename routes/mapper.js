const sequelize = require('../config/db');
const express = require("express");
const Mapper = require("../models/bilanmapper");
const router = express.Router();

// Get sankey for each country
router.get('/', async (req, res) => {
    try {
        const data = await Mapper.findAll();
        res.send(data);
    } catch (error) {
        res.status(error.status || 500).send("Something went wrong...");
    }
});

module.exports = router;