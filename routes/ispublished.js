const express = require("express");
const router = express.Router();
const Sankeys = require('../models/sankeydata');

// Get sankey data for a specific year and country
router.post('/', async (req, res) => {
    try {
        let { country } = req.body;

        // Get sankey data for specific parameters
        const publishedData = await Sankeys.findAll({
            attributes: ['year', 'data'],
            where:{
                is_published: true,
                country: country
            }
        });
        const formattedData = {}
        publishedData.forEach((record)=>{
            formattedData[record.year] = record.data;
        })

        res.status(200).send(formattedData);
    } catch (error) {
        res.status(400).send("Something went wrong!");
    }

});

module.exports = router;