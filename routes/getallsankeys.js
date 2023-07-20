const express = require("express");
const router = express.Router();
const Sankeys = require('../models/sankeydata');

// Get sankey data for a specific year and country
router.get('/', async (req, res) => {
    try {
        const { role } = req.authData;
    if(req.authData)
    if (role !== "admin") {
        return res.status(401).send( "Access forbidden. You are not an admin." );
      }
        // Get sankey data for specific parameters
        const sankey = await Sankeys.findAll();
        res.status(200).send(sankey);
    } catch (error) {
        console.log(error);
        res.status(400).send("Something went wrong!");
    }

});

module.exports = router;