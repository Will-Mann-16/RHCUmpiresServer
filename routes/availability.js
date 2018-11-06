var express = require('express');
var router = express.Router();
var availabilityCRUD = require('../crud/availability');

router.get('/availability-page/:umpireID', (req, res) => {
    availabilityCRUD.readAvailabilityPerUmpire(req.params.umpireID, (status, result) => {
        res.status(status).json(status === 500 ? {error: result} : {fixtures: result});
    });
});

router.post('/', (req, res) => {
    availabilityCRUD.createAvailability(req.body.availability, (status, result) => {
        res.status(status).json(status === 500 ? {error: result} : {availabilityID: result});
    });
});

router.post('/:availabilityID', (req, res) => {
    availabilityCRUD.updateAvailabilty(req.params.availabilityID, req.body.availability, (status, result) => {
        res.status(status).json(status === 500 ? {error: result} : {availabilityID: result});
    });
});

router.delete('/:availabilityID', function(req, res){
    availabilityCRUD.deleteAvailability(req.params.availabilityID, (status, result) => {
        res.status(status).json(status === 500 ? {error: result} : {success: result});
    });
});

module.exports = router;
