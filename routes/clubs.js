var express = require('express');
var router = express.Router();
var clubCRUD = require('../crud/clubs');
var teamCRUD = require('../crud/teams');

router.get('/', function(req, res) {
  clubCRUD.readClubs(res.locals.connection, (status, clubs) => {
    if(status === 500) res.status(status).json({error: clubs})
    else{
      var result = [];
      clubs.forEach((club) => {
        teamCRUD.readTeamsByClub(res.locals.connection, club.clubID, (status, teams) => {
          if(status === 500) res.status(status).json({error: teams});
          else result.push({...club, teams});
        });
      });
    }
  });
});

router.get('/:clubID', function(req, res) {
    clubCRUD.readClub(res.locals.connection, req.params.clubID, (status, result) => {
        res.status(status).json(status === 500 ? {error: result} : {club: result});
    });
});

router.post('/', function(req, res){
    clubCRUD.createClub(res.locals.connection, req.body.club, (status, result) => {
        res.status(status).json(status === 500 ? {error: result} : {clubID: result});
    });
});

router.post('/:clubID', function(req, res){
      clubCRUD.updateClub(res.locals.connection, req.params.clubID, req.body.club, (status, result) => {
        res.status(status).json(status === 500 ? {error: result} : {clubID: result});
    });
});

router.delete('/:clubID', function(req, res){
    clubCRUD.deleteClub(res.locals.connection, req.params.clubID, (status, result) => {
        res.status(status).json(status === 500 ? {error: result} : {success: result});
    });
});

module.exports = router;
