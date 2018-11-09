var db = require('../database');

module.exports.readUmpires = async () => {
  try{
    var umpires = await db.read('UmpireTable');
    umpires = await Promise.all(umpires.map(async (umpire) => {
      delete umpire.Password;
      var qualificationKeys = await db.read('QualificationsJunction', {condition: `umpireFK=${umpireID}`});
      var qualifications = await Promise.all(qualificationKeys.map(async ({qualificationFK}) => {
        return db.read('QualificationTable', {condition: `qualificationID=${qualificationFK}`, limit: 1});
      }));
      return {...umpire, qualifications};
    }));
    return Promise.resolve(umpires);
  } catch (e) {
    return Promise.reject(e);
  }
};

module.exports.readUmpire = async (umpireID) => {
    try{
        var umpire = await db.read('UmpireTable', {condition: `umpireID=${umpireID}`, limit: 1});
        delete umpire.Password;
        var qualificationKeys = await db.read('QualificationsJunction', {condition: `umpireFK=${umpireID}`});
        var qualifications = await Promise.all(qualificationKeys.map(async ({qualificationFK}) => {
            return db.read('QualificationTable', {condition: `qualificationID=${qualificationFK}`, limit: 1});
        }));
        return Promise.resolve({...umpire, qualifications});
    } catch (e) {
        return Promise.reject(e);
    }
};

module.exports.createUmpire = (umpire) => {
    return db.create('UmpireTable', umpire, {returnRow: true, idSelector: 'umpireID'});
};

module.exports.updateUmpire = (umpireID, umpire) => {
    return db.update('UmpireTable', umpire, {returnRow: true, idSelector: 'umpireID', id: umpireID});
};

module.exports.deleteUmpire = (umpireID) => {
    return db.delete('UmpireTable', {id: umpireID, idSelector: 'umpireID'});
};


