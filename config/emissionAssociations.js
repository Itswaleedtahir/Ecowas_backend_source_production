const emissionYears = require("./models/emissionsankey");
const emissionData = require("./models/emissionsankeycellule");
const emissionMap = require("./models/emissionmapper");
const countries = require("./models/pays");

emissionYears.hasOne(emissionData, {
    foreignKey: 'idemissionsankey'
});
emissionData.belongsTo(emissionYears);

countries.hasMany(emissionYears, {
    foreignKey: 'pays'
});
emissionYears.belongsTo(countries);

emissionMap.hasMany(emissionData, {
    foreignKey: 'lincole'
});
emissionData.belongsTo(emissionMap);