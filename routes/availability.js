var express = require('express');
var router = express.Router();
var availabilityCRUD = require('../crud/availability');

router.get('/availability-page/:umpireID', function(req, res){
    availabilityCRUD.readAvailabilityPerUmpire(res.locals.connection, req.params.umpireID, (status, result) => {
        res.status(status).json(status === 500 ? {error: result} : {fixtures: result});
    });
});

router.post('/', function(req, res){
    availabilityCRUD.createAvailability(res.locals.connection, req.body.availability, (status, result) => {
        res.status(status).json(status === 500 ? {error: result} : {availabilityID: result});
    });
});

router.post('/:availabilityID', function(req, res){
    availabilityCRUD.updateAvailabilty(res.locals.connection, req.params.availabilityID, req.body.availability, (status, result) => {
        res.status(status).json(status === 500 ? {error: result} : {availabilityID: result});
    });
});

router.delete('/:availabilityID', function(req, res){
        availabilityCRUD.deleteAvailability(res.locals.connection, req.params.availabilityID, (status, result) => {
        res.status(status).json(status === 500 ? {error: result} : {success: result});
    });
});

module.exports = router;
