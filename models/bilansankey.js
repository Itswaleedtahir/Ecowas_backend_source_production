const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Create Sankey Energy Years Model
const sankeyEnergyYears = sequelize.define("bilansankey", {
    idbilansankey: {
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
    tableName: 'bilansankey'
});

// Check Model
sequelize.sync().then(() => {
    console.log('BilanSankey table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = sankeyEnergyYears;