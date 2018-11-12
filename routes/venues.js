var express = require('express');
var router = express.Router();
var venueCRUD = require('../crud/venues');

router.get('/', function(req, res) {
  venueCRUD.readVenues();
});

router.get('/:venueID', function(req, res) {
  venueCRUD.readVenue(req.params.venueID).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.post('/', function(req, res){
  venueCRUD.createVenue(req.body.venue).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.post('/:venueID', function(req, res){
  venueCRUD.updateVenue(req.params.venueID, req.body.venue).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});
router.delete('/:venueID', function(req, res){
  venueCRUD.deleteVenue(req.params.venueID);
});

module.exports = router;
