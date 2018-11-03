var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.locals.connection.query("SELECT * FROM VenueTable", function(err, result, fields){
    if(err) return res.status(500).json({error: err});
  });
});

router.get('/:venueID', function(req, res) {
  res.locals.connection.query("SELECT * FROM VenueTable WHERE venueID=" + req.params.venueID + " LIMIT 1", function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

router.post('/', function(req, res){
  res.locals.connection.query("INSERT INTO VenueTable (Name, Address) VALUES ?", [req.body.Name, req.body.Address], function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

router.post('/:venueID', function(req, res){
  res.locals.connection.query(`UPDATE VenueTable SET Name='${req.body.Name}', Address='${req.body.Address}' WHERE venueID=${req.params.venueID}`, function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});
router.delete('/:venueID', function(req, res){
  res.locals.connection.query(`DELETE FROM VenueTable WHERE venueID=${req.params.venueID}`, function(err, result, fields){
    if (err) return res.status(500).json({ error: err });
  });
});

module.exports = router;
