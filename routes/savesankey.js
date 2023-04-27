const _ = require('lodash');
const express = require("express");
const router = express.Router();
const Sankeys = require('../models/sankeydata');

// Create and save a new sankey into Sankeys Table
router.post('/', async (req, res) => {

    // Request payload data and header data
    let { year, country, data } = req.body;
    const token = req.header('x-auth-token');

    try {
        // Check if sankey already exists?
        let sankey = await Sankeys.findOne({ where: { year, country }});

        if(sankey) {
            // Update sankey record
            let updatedSankey = await Sankeys.update(
                {
                    data: data ? data : sankey.data
                },
                {
                    where: { year, country },
                    returning: true,
                    plain: true,
                }
            );
            
            // Send success reponse
            res.header('x-auth-token', token).send("Sankey saved successfully!");
        } else {
            // Insert sankey record
            sankey = await Sankeys.create(_.pick(req.body, ['year', 'country', 'data']));

            // Send success reponse
            res.header('x-auth-token', token).send("Sankey created successfully!");
        }
    } catch (error) {
        // Send error reponse
        res.header('x-auth-token', token).send(error);
    }
});

module.exports = router;