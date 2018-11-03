var umpireCRUD = require("./umpires");

module.exports.readFixtures = (connection, callback) => {
  connection.query("SELECT * FROM FixtureTable", function(err, result, fields){
    if(err) callback(500, err);
    else callback(200, result);
  });
};

module.exports.readFixture = (connection, fixtureID, callback) => {
      connection.query("SELECT * FROM FixtureTable WHERE fixtureID=" + fixtureID + " LIMIT 1", function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result[0]);
  });
};

module.exports.readFixturesPerUmpire = (connection, umpireID, callback) => {
  connection.query(`SELECT fixtureFK FROM FixtureJunction WHERE umpireFK=${umpireID}`, (err, result) => {
    if(err) callback(500, err);
    else{
      var completedResult = [];
      result.forEach(({fixtureFK}) => module.exports.readFixture(connection, fixtureFK, (status, result) => {
        if (status === 500) callback(500, result);
        else completedResult.push(result);
      }));
      callback(200, completedResult);
    }
  });
};

module.exports.readUmpiresPerFixture = (connection, fixtureID, callback) => {
  connection.query(`SELECT umpireFK FROM FixturesJunction WHERE fixtureFK=${fixtureID}`, (err, result) => {
    if(err) callback(500, err);
    else{
            var completedResult = [];
            result.forEach(({umpireFK}) => umpireCRUD.readUmpire(connection, umpireFK, (status, result) => {
              if (status === 500) callback(500, result);
              else completedResult.push(result);
            }));
            callback(200, completedResult);
    }
  });
}

module.exports.createFixture = (connection, fixture, callback) => {
  connection.query("INSERT INTO FixtureTable (DateTime, homeTeamFK, awayTeamFK, venueFK, leagueFK, TimeSlot, NoOfUmpires) VALUES ?", [fixture.DateTime, fixture.homeTeamFK, fixture.awayTeamFK, fixture.venueFK, fixture.leagueFK, fixture.TimeSlot, fixture.NoOfUmpires], function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result.insertId);
  });
};

module.exports.updateFixture = (connection, fixtureID, fixture, callback) => {
connection.query(`UPDATE FixtureTable SET DateTime='${fixture.DateTime}', homeTeamFK=${fixture.homeTeamFK}, awayTeamFK=${fixture.awayTeamFK}, venueFK=${fixture.venueFK}, leagueFK=${fixture.leagueFK}, TimeSlot=${fixture.TimeSlot}, NoOfUmpires=${fixture.NoOfUmpires} WHERE fixtureID=${fixtureID}`, function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result.insertId);
  });
};

module.exports.deleteFixture = (connection, fixtureID, callback) => {
res.locals.connection.query(`DELETE FROM FixtureTable WHERE fixtureID=${fixtureID}`, function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, true);
  });
};


