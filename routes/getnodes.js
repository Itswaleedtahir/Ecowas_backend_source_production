const sequelize = require('../config/db');
const express = require("express");
const Nodes = require("../models/sankeynodes");
const router = express.Router();

// Get all saved nodes of sankey
router.get('/', async (req, res) => {
    try {
        // Query to get sankey nodes data
        const data = await Nodes.findAll();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).send("Something went wrong...");
    }
});

module.exports = router;