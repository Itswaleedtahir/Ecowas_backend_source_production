const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

// Create Energy Sankey Data Model
const sankeyEnergyData = sequelize.define("bilansankeycellule", {
    idbilansankey: {
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
    tableName: 'bilansankeycellule'
});

// Check if table exists in database
sequelize.sync().then(() => {
    console.log('bilansankeycellule table is now available!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = sankeyEnergyData;