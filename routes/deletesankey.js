const sequelize = require('../config/db');
const express = require("express");
const Nodes = require("../models/sankeydata");
const router = express.Router();

// Delete saved nodes of sankey
router.delete('/', async (req, res) => {
    try {
        // get request parameters
        const {sankey_id } = req.body;

        // Query to delete sankey nodes data
        const data = await Nodes.destroy({
            where: {sankey_id: sankey_id}
        });
        res.status(200).send(sankey_id);
    } catch (error) {
        res.status(error.status || 500).send("Something went wrong...");
    }
});

module.exports = router;