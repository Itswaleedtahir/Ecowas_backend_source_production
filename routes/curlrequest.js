const request = require('request');
const express = require("express");
const router = express.Router();

// Get sankey for each country
router.get('/', async (req, res) => {
    const url = 'http://ecowasbackend-env.eba-hvykxkzm.eu-west-1.elasticbeanstalk.com/home';
      
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.send(body); // send the response HTML to the client
        } else {
            res.status(500).send(error); // send the error to the client with 500 status code
        }
    });
});

module.exports = router;