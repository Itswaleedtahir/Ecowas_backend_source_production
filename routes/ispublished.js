const express = require("express");
const router = express.Router();
const Sankeys = require('../models/sankeydata');
const Nodes = require('../models/sankeynodes');
const modifyData = require("../helper/modifycolor")

// Get sankey data for a specific year and country
router.get('/:country', async (req, res) => {
    try {
        let { country } = req.params;

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
        const nodes = await Nodes.findAll()

        const modifiedData = modifyData(formattedData, nodes);
        console.log(modifiedData)
        res.status(200).send(formattedData);
    } catch (error) {
        console.log(error)
        res.status(400).send("Something went wrong!");
    }

});

module.exports = router;