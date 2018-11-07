
var db = require('../database');

module.exports.readClubs = () => {
  return db.read('ClubTable');
};

module.exports.readClub = (clubID) => {
  return db.read('ClubTable', {condition: `clubID=${clubID}`, limit: 1});
};

module.exports.createClub = (club) => {
  return db.create('ClubTable', club, {returnRow: true, idSelector: 'clubID'});
};

module.exports.updateClub = (clubID, club) => {
  return db.update('ClubTable', club, {returnRow: true, idSelector: 'clubID', id: clubID});
};

module.exports.deleteClub = (clubID) => {
  return db.delete('ClubTable', {idSelector: 'clubID', id: clubID});
};


