const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'ecowas_dem',
    'admin',
    'ecowas12345',
    {
        host: 'ecowas-samky-db.cbfte2i14par.eu-west-1.rds.amazonaws.com',
        dialect: 'mysql'
    }
)

const checkConn = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

checkConn();

module.exports = sequelize;