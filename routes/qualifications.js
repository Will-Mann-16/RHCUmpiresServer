var express = require('express');
var router = express.Router();
var qualificationsCRUD = require('../crud/qualifications');

router.get('/', function(req, res) {
  qualificationsCRUD.readQualifications().then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.get('/:qualificationID', function(req, res) {
  qualificationsCRUD.readQualification(req.params.qualificationID).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.post('/', function(req, res){
  qualificationsCRUD.createQualification(req.body.qualification).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.post('/:qualificationID', function(req, res){
  qualificationsCRUD.updateQualification(req.params.qualificationID, req.body.qualification).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.delete('/:qualificationID', function(req, res){
  qualificationsCRUD.deleteQualification(req.params.qualificationID);
});

module.exports = router;
