const sequelize = require('../config/db');
const express = require("express");
const Nodes = require("../models/sankeynodes");
const router = express.Router();
const path = require("path");
const fs = require("fs");
// Get all saved nodes of sankey
router.delete('/', async (req, res) => {
    try {
       const { id } = req.body;
       const node = await Nodes.findOne({ where:{id:id}})
    if (!node) return res.status(400).send('No such node exists.');
       
    const nodes = Nodes.destroy({ where:{id:id}})
    const imagepath = path.join(__dirname, '..', 'public/nodes', node.image)
    if (fs.existsSync(imagepath) && node.image) {
    fs.unlinkSync(imagepath)}
    res.status(200).send({ message:"Node deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).send("Something went wrong...");
    }
});

module.exports = router;