const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

// Create a Model for the nodes of all the Sankeys
const sankeyNodes = sequelize.define("sankeynodes", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    image: {
        type: DataTypes.STRING
    },
    colour:{
        type: DataTypes.STRING
    }
}, {
    tableName: 'sankeynodes',
    timestamps: false
});

// Check if table exists in database
sequelize.sync().then(() => {
    console.log('sankeynodes table is now available!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = sankeyNodes;