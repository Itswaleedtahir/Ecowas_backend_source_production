const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Create Sankey Emission Years Model
const sankeyEmissionYears = sequelize.define("emissionsankey", {
    idemissionsankey: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    pays: {
        type: DataTypes.STRING
    },
    annee: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'emissionsankey'
});

// Check Model
sequelize.sync().then(() => {
    console.log('Emission sankey table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = sankeyEmissionYears;