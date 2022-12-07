const sequelize = require('../config/db');
const express = require("express");
const router = express.Router();
const countries = require('../models/pays');
const { Op } = require("sequelize");

// Get countries table
router.get('/', async (req, res) => {
    const cedeao = await countries.findByPk('CEDEAO');
    const countryData = await countries.findAll({
        where: {
            codePays: {
                [Op.ne]: ['CEDEAO']
            }
        },
        order: [
            ["nomPays", 'ASC']
        ]
    });
    countryData.unshift(cedeao);
    
    res.send(countryData);
});

module.exports = router;