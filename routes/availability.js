var express = require('express');
var router = express.Router();
var availabilityCRUD = require('../crud/availability');

router.get('/', (req, res) => {
    availabilityCRUD.readAvailabilityPerUmpire(req.user.umpireID).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
    availabilityCRUD.createAvailability(req.body.availability).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.post('/:availabilityID', (req, res) => {
    availabilityCRUD.updateAvailability(req.params.availablityID, req.body.availablilty).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.delete('/:availabilityID', function(req, res){
    availabilityCRUD.deleteAvailability(req.params.availabilityID).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

module.exports = router;
