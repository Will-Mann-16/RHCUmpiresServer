var express = require('express');
var router = express.Router();
var fixturesCRUD = require("../crud/fixtures");
var teamCRUD = require("../crud/teams");
var venueCRUD = require("../crud/venues");
var leagueCRUD = require("../crud/leagues");
var {convertFromPacket} = require("../functions");

router.get('/', function(req, res) {
  fixturesCRUD.readFixtures(res.locals.connection, (status, result) => {
    if(status === 500) res.status(status).json({error: result});
    else{
      var finalResult = [];
      result.forEach(fixture => {
        teamCRUD.readTeamAndClub(res.locals.connection, fixture.homeTeamFK, (status, homeTeam) => {
            if(status === 500) res.status(status).json({error: homeTeam});
            else teamCRUD.readTeamAndClub(res.locals.connection, fixture.awayTeamFK, (status, awayTeam) => {
                if(status === 500) res.status(status).json({error: awayTeam});
                else venueCRUD.readVenue(res.locals.connection, fixture.venueFK, (status,venue) => {
                      if(status === 500) res.status(status).json({error: venue});
                      else leagueCRUD.readLeague(res.locals.connection, fixture.leagueFK, (status, league) => {
                          if(status === 500) res.status(status).json({error: venue});
                          else finalResult.push(convertFromPacket({...fixture, homeTeam, awayTeam, venue, league}));
                          if(finalResult.length === result.length){
                            res.status(200).json({fixtures: finalResult});
                          }
                      });
                });
            });
        });
      });
    }
  });
});

router.get('/:fixtureID', function(req, res) {
  res.locals.connection.query("SELECT * FROM FixtureTable WHERE fixtureID=" + req.params.fixtureID + " LIMIT 1", function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json({fixture: result[0]});
  });
});

router.get('/per-umpire/:umpireID', function(req, res){
  fixturesCRUD.readFixturesPerUmpire(res.locals.connection, req.params.umpireID, (status, result) => {
    if(status === 500) res.status(500).json({error: result});
    else{
      result.forEach((fixture) => {
        fixtures.CRUD.readUmpiresPerFixture(res.locals.connection, fixture.fixtureID, (status, result) => {
              if(status === 500) res.status(500).json({error: result});
              else{
                var umpires = result;
                //TODO add home/away team, league and venue queries
              }
        });
      });
    }
  });
});

router.post('/', function(req, res){
  res.locals.connection.query("INSERT INTO FixtureTable (DateTime, homeTeamFK, awayTeamFK, venueFK, leagueFK, TimeSlot, NoOfUmpires) VALUES ?", [req.body.DateTime, req.body.homeTeamFK, req.body.awayTeamFK, req.body.venueFK, req.body.leagueFK, req.body.TimeSlot, req.body.NoOfUmpires], function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json({fixtureID: result.insertId});
  });
});

router.post('/:fixtureID', function(req, res){
  res.locals.connection.query(`UPDATE FixtureTable SET DateTime='${req.body.DateTime}', homeTeamFK=${req.body.homeTeamFK}, awayTeamFK=${req.body.awayTeamFK}, venueFK=${req.body.venueFK}, leagueFK=${req.body.leagueFK}, TimeSlot=${req.body.TimeSlot}, NoOfUmpires=${req.body.NoOfUmpires} WHERE fixtureID=${req.params.fixtureID}`, function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json({fixtureID: result.insertId});
  });
});

router.delete('/:fixtureID', function(req, res){
  res.locals.connection.query(`DELETE FROM FixtureTable WHERE fixtureID=${req.params.fixtureID}`, function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json({});
  });
});

module.exports = router;
