var db = require('../database');
module.exports.readLeagues = () => {
  return db.read('LeagueTable');
};

module.exports.readLeague = (leagueID) => {
    return db.read('LeagueTable', {condition: `leagueID=${leagueID}`, limit: 1});
};

module.exports.readLeagueAndDivision = async (leagueID) => {
  try {
      var league = await db.read('LeagueTable', {condition: `leagueID=${leagueID}`, limit: 1});
      var division = await db.read('DivisionTable', {condition: `divisionID=${league.divisionFK}`, limit: 1});
      return Promise.resolve({...league, division});
  } catch (e){
    return Promise.reject(e);
  }
};

module.exports.createLeague = (league) => {
    return db.create('LeagueTable', league, {returnRow: true, idSelector: 'leagueID'});
};

module.exports.updateLeague = (leagueID, league) => {
    return db.update('LeagueTable', league, {returnRow: true, idSelector: 'leagueID', id: leagueID});

};

module.exports.deleteLeague = (leagueID) => {
    return db.delete('LeagueTable', {id: leagueID, idSelector: 'leagueID'});

};


