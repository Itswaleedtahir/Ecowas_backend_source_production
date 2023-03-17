const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

// Create Energy Sankey Years Model
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

// Check if table exists in database
sequelize.sync().then(() => {
    console.log('bilansankey table is now available!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = sankeyEnergyYears;