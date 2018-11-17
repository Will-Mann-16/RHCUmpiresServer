var express = require('express');
var router = express.Router();
var leagueCRUD = require('../crud/leagues');


router.get('/', function(req, res) {
    leagueCRUD.readLeagues().then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.get('/:leagueID', function(req, res) {
  leagueCRUD.readLeague(req.params.leagueID).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.post('/', function(req, res){
  leagueCRUD.createLeague(req.body.league).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.post('/:leagueID', function(req, res){
  leagueCRUD.updateLeague(req.params.leagueID, req.body.league).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.delete('/:leagueID', function(req, res){
  leagueCRUD.deleteLeague(req.params.leagueID).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

module.exports = router;
