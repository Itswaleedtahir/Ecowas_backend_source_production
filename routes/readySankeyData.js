const express = require("express");
const router = express.Router();
const sankeydata = require("../models/sankeydata");

// Get sankey data for a specific year and country
router.patch("/", async (req, res) => {
  try {
    const { role } = req.authData;
    if (req.authData)
      if (role !== "admin") {
        throw {
          status: 403,
          message: "Access forbidden. You are not an admin.",
        };
      }
    // get request parameters
    const { sankey_id, country, year } = req.body;

    if (!sankey_id || !country || !year)
      return res.status(400).send("Required field cannot be empty");

    // Check if country and year exist
    const existingData = await sankeydata.findOne({
      where: { country: country, year: year },
    });
    if (existingData) {
      return res.status(409).send("Sankey data for this year and country already exists.");
    }

    const sankeyData = await sankeydata.findOne({
      where: { sankey_id: sankey_id },
    });
    let updatedUser = await sankeydata.update(
      {
        is_published: true,
      },
      {
        where: { sankey_id: sankeyData.sankey_id },
        returning: true,
        plain: true,
      }
    );
    return res.status(200).send("Published");
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong!");
  }
});

module.exports = router;
