var clubCRUD = require("./clubs");

module.exports.readTeams = (connection, callback) => {
  connection.query("SELECT * FROM TeamTable", function(err, result, fields){
        if (err) callback(500, err);
        else callback(200, result);
  });
};

module.exports.readTeam = (connection, teamID, callback) => {
  connection.query("SELECT * FROM TeamTable WHERE teamID=" + teamID + " LIMIT 1", function(err, result, fields){
        if (err) callback(500, err);
        else callback(200, result[0]);
  });
};

module.exports.readTeamsByClub = (connection, clubFK, callback) => {
  connection.query(`SELECT * FROM TeamTable WHERE clubFK=${clubFK}`, (err, result) => {
      if(err) callback(500, err);
      else callback(200, result);
  });
}

module.exports.readTeamAndClub = (connection, teamID, callback) => {
  module.exports.readTeam(connection, teamID, (status, team) => {
          if (status === 500) callback(500, team);
          else{
            clubCRUD.readClub(connection, team.clubFK, (status, club) => {
              if (status === 500) callback(500, club);
              else{
                callback(200, {...team, club});
              }
            })
          }
  });
}

module.exports.createTeam = (connection, team, callback) => {
  connection.query("INSERT INTO TeamTable (Name, clubFK) VALUES ?", [team.Name, team.clubFK], function(err, result, fields){
        if (err) callback(500, err);
        else callback(200, result.insertId);
  });
};

module.exports.updateTeam = (connection, teamID, team, callback) => {
  connection.query(`UPDATE TeamTable SET Name=${team.Name}, clubFK=${team.clubFK} WHERE teamID=${teamID}`, function(err, result, fields){
        if (err) callback(500, err);
        else callback(200, result.insertId);
  });
};

module.exports.deleteTeam = (connection, teamID, callback) => {
  connection.query(`DELETE FROM TeamTable WHERE teamID=${teamID}`, function(err, result, fields){
        if (err) callback(500, err);
        else callback(200, result.insertId);
  });
};

