const sequelize = require('../config/db');
const express = require("express");
const router = express.Router();

// Get sankey for each country
router.get('/', async (req, res) => {
    
    // Query to get sankey data
    const data = await sequelize.query(`
        SELECT * 
        FROM bilanmapper
    `);
    
    // Validation
    
    res.send(data[0]);
});

module.exports = router;