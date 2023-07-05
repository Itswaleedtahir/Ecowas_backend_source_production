const express = require("express");
const router = express.Router();
const Sankeys = require('../models/sankeydata');

// Get sankey data for a specific year and country
router.get('/', async (req, res) => {
    try {
        let { country, year } = req.body;
        const token = req.header('x-auth-token');   // Future work

        console.log(country + " and " + year);

        // Get sankey data for specific parameters
        const sankey = await Sankeys.findOne({ where: { country, year }});

        if(sankey) {
            res.status(200).send(sankey.data);
        } else {
            // If no data is availabe for specified parameters
            res.status(404).send("No record available for this year");
        }
    } catch (error) {
        res.status(400).send("Something went wrong!");
    }

});

module.exports = router;