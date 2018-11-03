var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.locals.connection.query("SELECT * FROM QualificationTable", function(err, result, fields){
    if(err) return res.status(500).json({error: err});
  });
});

router.get('/:qualificationID', function(req, res) {
  res.locals.connection.query("SELECT * FROM QualificationTable WHERE qualificationID=" + req.params.qualificationID + " LIMIT 1", function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

router.post('/', function(req, res){
  res.locals.connection.query("INSERT INTO QualificationTable (Name) VALUES ?", [req.body.Name], function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

router.post('/:qualificationID', function(req, res){
  res.locals.connection.query(`UPDATE QualificationTable SET Name='${req.body.Name}' WHERE qualificationID=${req.params.qualificationID}`, function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

router.delete('/:qualificationID', function(req, res){
  res.locals.connection.query(`DELETE FROM QualificationTable WHERE qualificationID=${req.params.qualificationID}`, function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

module.exports = router;
