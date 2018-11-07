
var db = require('../database');
module.exports.readDivisions = () => {
    return db.read('DivisionTable');
};

module.exports.readDivision = (divisionID) => {
    return db.read('DivisionTable', {condition: `divisionID=${divisionID}`, limit: 1});
};

module.exports.createDivision = (division) => {
    return db.create('DivisionTable', division, {returnRow: true, idSelector: 'divisionID'});

};

module.exports.updateDivision = (divisionID, division) => {
    return db.update('DivisionTable', division, {returnRow: true, idSelector: 'divisionID', id: divisionID});
};

module.exports.deleteDivision = (divisionID) => {
    return db.delete('DivisionTable', {idSelector: 'divisionID', id: divisionID});

};



