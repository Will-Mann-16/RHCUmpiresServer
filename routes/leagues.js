var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.locals.connection.query("SELECT * FROM LeagueTable", function(err, result, fields){
    if(err) return res.status(500).json({error: err});
  });
});

router.get('/:leagueID', function(req, res) {
  res.locals.connection.query("SELECT * FROM LeagueTable WHERE leagueID=" + req.params.leagueID + " LIMIT 1", function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

router.post('/', function(req, res){
  res.locals.connection.query("INSERT INTO LeagueTable (Name, divisionFK, qualificationFK) VALUES ?", [req.body.Name, req.body.divisionFK, req.body.qualificationFK], function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

router.post('/:leagueID', function(req, res){
  res.locals.connection.query(`UPDATE LeagueTable SET Name='${req.body.Name}', divisionFK=${req.body.divisionFK}, qualificationFK=${req.body.qualificationFK} WHERE leagueID=${req.params.leagueID}`, function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

router.delete('/:leagueID', function(req, res){
  res.locals.connection.query(`DELETE FROM LeagueTable WHERE leagueID=${req.params.leagueID}`, function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

module.exports = router;
