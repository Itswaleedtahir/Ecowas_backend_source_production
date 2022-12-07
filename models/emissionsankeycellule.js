const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Create Sankey Emission Data Model
const sankeyEmissionData = sequelize.define("emissionsankeycellule", {
    idemissionsankey: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    ligne: {
        type: DataTypes.STRING
    },
    colonne: {
        type: DataTypes.STRING
    },
    valuer: {
        type: DataTypes.STRING
    },
    typeproduit: {
        type: DataTypes.INTEGER
    },
    produit: {
        type: DataTypes.INTEGER
    },
    donnees: {
        type: DataTypes.STRING
    },
    linecole: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'emissionsankeycellule'
});

// Check Model
sequelize.sync().then(() => {
    console.log('Emissionsankeycellule table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = sankeyEmissionData;