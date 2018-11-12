var express = require('express');
var router = express.Router();
var clubCRUD = require('../crud/clubs');
var teamCRUD = require('../crud/teams');

router.get('/', async (req, res) => {
    try {
        var clubs = await clubCRUD.readClubs();
        clubs = await Promise.all(clubs.map(async ({clubID}) => {
            return teamCRUD.readTeamsByClub(clubID);
        }));
        res.status(200).json(clubs);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/:clubID', (req, res) => {
    clubCRUD.readClub(req.params.clubID).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
    clubCRUD.createClub(req.body.club).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.post('/:clubID', (req, res) => {
      clubCRUD.updateClub(req.params.clubID, req.body.club).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.delete('/:clubID', (req, res) => {
    clubCRUD.deleteClub(req.params.clubID).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

module.exports = router;
