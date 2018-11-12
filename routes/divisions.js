var express = require('express');
var router = express.Router();
var divisionCRUD = require('../crud/divisions');
router.get('/', function(req, res) {
    divisionCRUD.readDivisions().then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.get('/:divisionID', function(req, res) {
      divisionCRUD.readDivision(req.params.divisionID).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.post('/', function(req, res){
    divisionCRUD.createDivision(req.body.division).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.post('/:divisionID', function(req, res){
      divisionCRUD.updateDivision(req.params.divisionID, req.body.division).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.delete('/:divisionID', function(req, res){
      divisionCRUD.deleteDivision(req.params.divisionID).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

module.exports = router;
