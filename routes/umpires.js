var express = require('express');
var router = express.Router();
var umpireCRUD = require('../crud/umpires');

router.get('/', (req, res) => {
    res.status(200).json(req.user);
});

router.get('/list', (req, res) => {
  umpireCRUD.readUmpires().then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.get('/:umpireID', (req, res) => {
  umpireCRUD.readUmpire(req.params.umpireID).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  umpireCRUD.createUmpire(req.body.umpire).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.post('/:umpireID', (req, res) => {
  umpireCRUD.updateUmpire(req.params.umpireID, req.body.umpire).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

router.delete('/:umpireID', (req, res) => {
  umpireCRUD.deleteUmpire(req.params.umpireID).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

module.exports = router;
