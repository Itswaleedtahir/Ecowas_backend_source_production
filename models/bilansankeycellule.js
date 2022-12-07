const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Create Sankey Energy Data Model
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

// Check Model
sequelize.sync().then(() => {
    console.log('BilanSankeyCellule table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = sankeyEnergyData;