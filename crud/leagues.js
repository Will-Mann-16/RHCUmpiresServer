var divisionCRUD = require("./divisions");

module.exports.readLeagues = (connection, callback) => {
  connection.query("SELECT * FROM LeagueTable", function(err, result, fields){
    if(err) callback(500, err);
    else callback(200, result);
  });
};

module.exports.readLeague = (connection, leagueID, callback) => {
  connection.query("SELECT * FROM LeagueTable WHERE leagueID=" + leagueID + " LIMIT 1", function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result[0]);
  });
};

module.exports.readLeagueAndDivision = (connection, leagueID, callback) => {
  module.exports.readLeague(connection, leagueID, (status, league) => {
    if(status === 500) callback(500, league);
    else{
      divisionCRUD.readDivision(connection, league.divisionFK, (status, division) => {
          if(status === 500) callback(500, division);
          else callback(200, {...league, division});
      })
    }
  })
};

module.exports.createLeague = (connection, league, callback) => {
  connection.query("INSERT INTO LeagueTable (Name, divisionFK, qualificationFK) VALUES ?", [league.Name, league.divisionFK, league.qualificationFK], function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result.insertId);
  });
};

module.exports.updateLeague = (connection, leagueID, league, callback) => {
  connection.query(`UPDATE LeagueTable SET Name='${league.Name}', divisionFK=${league.divisionFK}, qualificationFK=${league.qualificationFK} WHERE leagueID=${leagueID}`, function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result.insertId);
  });
};

module.exports.deleteLeague = (connection, leagueID, callback) => {
  connection.query(`DELETE FROM LeagueTable WHERE leagueID=${leagueID}`, function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, true);
  });
};


