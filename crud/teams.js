var db = require('../database');

module.exports.readTeams = () => {
    return db.read('TeamTable');
};

module.exports.readTeam = (teamID) => {
    return db.read('TeamTable', {condition: `teamID=${teamID}`, limit: 1});
};

module.exports.readTeamsByClub = (clubFK) => {
  return db.read('TeamTable', {condition: `clubFK=${clubFK}`});
}

module.exports.readTeamAndClub = async (teamID) => {
    try {
        var team = await db.read('TeamTable', {condition: `teamID=${teamID}`, limit: 1});
        var club = await db.read('ClubTable', {condition: `clubID=${team.clubFK}`, limit: 1});
        return Promise.resolve({...team, club});
    } catch (e){
        return Promise.reject(e);
    }
}

module.exports.createTeam = (team) => {
    return db.create('TeamTable', team, {returnRow: true, idSelector: 'teamID'});
};

module.exports.updateTeam = (teamID, team) => {
    return db.update('TeamTable', team, {returnRow: true, idSelector: 'teamID', id: teamID});
};

module.exports.deleteTeam = (teamID) => {
    return db.delete('TeamTable', {id: teamID, idSelector: 'teamID'});
};

