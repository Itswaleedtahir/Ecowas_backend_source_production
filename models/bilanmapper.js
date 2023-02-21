const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

// Create SankeyYears Model
const mappedEnergyData = sequelize.define("bilanmapper", {
    Cell: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    Input: {
        type: DataTypes.STRING
    },
    Output: {
        type: DataTypes.STRING
    },
    Color: {
        type: DataTypes.STRING
    },
    Image: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'bilanmapper',
    timestamps: false
});

// Check Model
sequelize.sync().then(() => {
    console.log('Excel Mapper table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = mappedEnergyData;