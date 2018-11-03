var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.locals.connection.query("SELECT * FROM UmpireTable", function(err, result, fields){
    if(err) return res.status(500).json({error: err});
  });
});

router.get('/:umpireID', function(req, res) {
  res.locals.connection.query("SELECT * FROM UmpireTable WHERE umpireID=" + req.params.umpireID + " LIMIT 1", function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

router.post('/', function(req, res){
  res.locals.connection.query("INSERT INTO UmpireTable (Firstname, Surname, Email, PhoneNumber, Password) VALUES ?", [req.body.Firstname, req.body.Surname, req.body.Email, req.body.PhoneNumber, req.body.Password], function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

router.post('/:umpireID', function(req, res){
  res.locals.connection.query(`UPDATE UmpireTable SET Firstname=${req.body.Firstname}, Surname=${req.body.Surname}, Email=${req.body.Email}, PhoneNumber=${req.body.PhoneNumber}, Password=${req.body.Password} WHERE umpireID=${req.params.umpireID}`, function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

router.delete('/:umpireID', function(req, res){
  res.locals.connection.query(`DELETE FROM UmpireTable WHERE umpireID=${req.params.umpireID}`, function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

module.exports = router;
