var express = require('express');
var router = express.Router();
var teamCRUD = require('../crud/teams');

router.get('/', function(req, res) {
  teamCRUD.readTeams().then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.get('/:teamID', function(req, res) {
  teamCRUD.readTeam(req.params.teamID).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.post('/', function(req, res){
  teamCRUD.createTeam(req.body.team).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.post('/:teamID', function(req, res){
  teamCRUD.updateTeam(req.params.teamID, req.body.team).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.delete('/:teamID', function(req, res){
  teamsCRUD.deleteTeam(req.params.teamID).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

module.exports = router;
