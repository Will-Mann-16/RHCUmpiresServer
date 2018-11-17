var express = require('express');
var router = express.Router();
var fixturesCRUD = require("../crud/fixtures");
var teamCRUD = require("../crud/teams");
var venueCRUD = require("../crud/venues");
var leagueCRUD = require("../crud/leagues");

router.get('/', async (req, res) => {
    try {
        var fixtures = await fixturesCRUD.readFixtures();
        fixtures = await Promise.all(fixtures.map(async (fixture) => {
            var umpires = await fixturesCRUD.readUmpiresPerFixture(fixture.fixtureID);
            var homeTeam = await teamCRUD.readTeamAndClub(fixture.homeTeamFK);
            var awayTeam = await teamCRUD.readTeamAndClub(fixture.awayTeamFK);
            var venue = await venueCRUD.readVenue(fixture.venueFK);
            var league = fixture.leagueFK === -1 ? 'Friendly' : await leagueCRUD.readLeagueAndDivision(fixture.leagueFK);
            return {...fixture, Umpires: umpires, HomeTeam: homeTeam, AwayTeam: awayTeam, Venue: venue, League: league};
        }));
        res.status(200).json(fixtures);
    } catch (e) {
        res.status(500).json(e);
    }
});
router.get('/umpire', async (req, res) => {
    try {
        var fixtures = await fixturesCRUD.readFixturesPerUmpire(req.user.umpireID, true);
        fixtures = await Promise.all(fixtures.map(async (fixture) => {
            var umpires = await fixturesCRUD.readUmpiresPerFixture(fixture.fixtureID);
            var homeTeam = await teamCRUD.readTeamAndClub(fixture.homeTeamFK);
            var awayTeam = await teamCRUD.readTeamAndClub(fixture.awayTeamFK)
            var venue = await venueCRUD.readVenue(fixture.venueFK);
            var league = fixture.leagueFK === -1 ? 'Friendly' : await leagueCRUD.readLeagueAndDivision(fixture.leagueFK);
            return {...fixture, Umpires: umpires, HomeTeam: homeTeam, AwayTeam: awayTeam, Venue: venue, League: league};
        }));
        res.status(200).json(fixtures);
    } catch (e) {
        res.status(500).json(e);
    }
});
router.get('/:fixtureID', (req, res) => {
  fixturesCRUD.readFixture(req.params.fixtureID).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});
router.post('/', (req, res) => {
  fixturesCRUD.createFixture(req.body.fixture).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.post('/:fixtureID', (req, res) => {
  fixturesCRUD.updateFixture(req.params.fixtureID, req.body.fixture).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.delete('/:fixtureID', (req, res) => {
    fixturesCRUD.deleteFixture(req.params.fixtureID).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

module.exports = router;
