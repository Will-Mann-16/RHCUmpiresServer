var express = require('express');
var router = express.Router();
var divisionCRUD = require('../crud/divisions');
router.get('/', function(req, res) {
    divisionCRUD.readDivisions(res.locals.connection, (status, result) => {
        res.status(status).json(status === 500 ? {error: result} : {divisions: result});
    });
});

router.get('/:divisionID', function(req, res) {
      divisionCRUD.readDivision(res.locals.connection, req.params.divisionID, (status, result) => {
        res.status(status).json(status === 500 ? {error: result} : {division: result});
    });
});

router.post('/', function(req, res){
    divisionCRUD.createDivision(res.locals.connection, req.body.club, (status, result) => {
        res.status(status).json(status === 500 ? {error: result} : {divisionID: result});
    });
});

router.post('/:divisionID', function(req, res){
      divisionCRUD.updateDivision(res.locals.connection, req.body.divisionID, req.body.division, (status, result) => {
        res.status(status).json(status === 500 ? {error: result} : {divisionID: result});
    });
});

router.delete('/:divisionID', function(req, res){
      divisionCRUD.deleteDivision(res.locals.connection, req.body.club, (status, result) => {
        res.status(status).json(status === 500 ? {error: result} : {success: result});
    });
});

module.exports = router;
