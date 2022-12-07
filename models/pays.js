const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

// Create SankeyYears Model
const countries = sequelize.define("pays", {
    codePays: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    nomPays: {
        type: DataTypes.STRING
    }, 
    flagslug: {
        type: DataTypes.STRING
    }, 
},{
    timestamps: false
});

// Check Model
sequelize.sync().then(() => {
    console.log('Countries table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = countries;