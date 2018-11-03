var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.locals.connection.query("SELECT * FROM TeamTable", function(err, result, fields){
    if(err) return res.status(500).json({error: err});
  });
});

router.get('/:teamID', function(req, res) {
  res.locals.connection.query("SELECT * FROM TeamTable WHERE teamID=" + req.params.teamID + " LIMIT 1", function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

router.post('/', function(req, res){
  res.locals.connection.query("INSERT INTO TeamTable (Name, clubFK) VALUES ?", [req.body.Name, req.body.clubFK], function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

router.post('/:teamID', function(req, res){
  res.locals.connection.query(`UPDATE TeamTable SET Name=${req.body.Name}, clubFK=${req.body.clubFK} WHERE teamID=${req.params.teamID}`, function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

router.delete('/:teamID', function(req, res){
  res.locals.connection.query(`DELETE FROM TeamTable WHERE teamID=${req.params.teamID}`, function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

module.exports = router;
