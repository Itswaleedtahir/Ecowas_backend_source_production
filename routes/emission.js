const sequelize = require("../config/db");
const express = require("express");
const { formatData } = require("../helper/format");
const router = express.Router();

// Get sankey for each country
router.get("/:cc", async (req, res) => {
  // Default country logic
  const country = req.params.cc || "NA";

  // Query to get sankey data
  const data = await sequelize.query(`
        SELECT emissionsankey.annee, emissionmapper.Input, emissionmapper.Output, emissionsankeycellule.valeur, emissionmapper.Color 
        FROM emissionmapper, emissionsankeycellule, emissionsankey 
        WHERE emissionmapper.Cell = emissionsankeycellule.linecole 
        && emissionsankeycellule.idemissionsankey = emissionsankey.idemissionsankey 
        && emissionsankey.pays = "${country}" 
        && emissionsankeycellule.valeur != "0"
        && emissionsankeycellule.valeur != ""
        ORDER BY emissionsankeycellule.idemissionsankey ASC, emissionsankeycellule.colonne ASC
    `);

  // Validation

  // Reformat and send response
  res.send(formatData(data[0]));
});

module.exports = router;
