var db = require('../database');

module.exports.readQualifications = () => {
    return db.read('QualificationTable');
};
module.exports.readQualification = (qualificationID) => {
    return db.read('QualificationTable', {condition: `qualificationID=${qualificationID}`, limit: 1});
};

module.exports.createQualification = (qualification) => {
    return db.create('QualificationTable', qualification, {returnRow: true, idSelector: 'qualificationID'});
};

module.exports.updateQualification = (qualificationID, qualification) => {
    return db.update('QualificationTable', qualification, {returnRow: true, idSelector: 'qualificationID', id: qualificationID});
};

module.exports.deleteQualification = (qualificationID,) => {
    return db.delete('QualificationTable', {id: qualificationID, idSelector: 'qualificationID'});
});


