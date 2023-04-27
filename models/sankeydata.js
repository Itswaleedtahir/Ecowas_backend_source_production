const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

// Create a Model for the data of all the Sankeys
const sankeyData = sequelize.define("sankeynodes", {
    sankey_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    year: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    data: {
        type: DataTypes.JSON
    }
}, {
    tableName: 'sankeydata',
    timestamps: false
});

// Check if table exists in database
sequelize.sync().then(() => {
    console.log('sankey table is now available!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = sankeyData;