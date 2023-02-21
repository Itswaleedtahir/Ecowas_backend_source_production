const sequelize = require('../config/db');
const express = require("express");
const Mapper = require("../models/bilanmapper");
const router = express.Router();

// Get sankey for each country
router.get('/', async (req, res) => {
    
    // Query to get sankey data
    // const data = await sequelize.query(`
    //     SELECT * 
    //     FROM bilanmapper
    // `);
    try {
        const data = await Mapper.findAll();
        res.send(data[0]);
    } catch (error) {
        res.status(error.status || 500).send("Something went wrong...");
    }
});

module.exports = router;