const bilanYears = require("./models/bilansankey");
const bilanData = require("./models/bilansankeycellule");
const bilanMap = require("./models/bilanmapper");
const countries = require("./models/pays");

bilanYears.hasOne(bilanData, {
    foreignKey: 'idbilansankey'
});
bilanData.belongsTo(bilanYears);

countries.hasMany(bilanYears, {
    foreignKey: 'pays'
});
bilanYears.belongsTo(countries);

bilanMap.hasMany(bilanData, {
    foreignKey: 'lincole'
});
bilanData.belongsTo(bilanMap);