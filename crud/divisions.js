var express = require('express');
var router = express.Router();

module.exports.readDivisions = (connection, callback) => {
  connection.query("SELECT * FROM DivisionTable", function(err, result, fields){
    if(err) callback(500, err);
    else callback(200, result);
  });
};

module.exports.readDivision = (connection, divisionID, callback) => {
  connection.query("SELECT * FROM DivisionTable WHERE divisionID=" + divisionID + " LIMIT 1", function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result[0]);
  });
};

module.exports.createDivison = (connection, division, callback) => {
  connection.query("INSERT INTO DivisionTable (Name) VALUES ?", [division.Name], function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result.insertId);
  });
};

module.exports.updateDivision = (connection, divisionID, division, callback) => {
  connection.query(`UPDATE DivisionTable SET Name=${division.Name} WHERE divisionID=${divisionID}`, function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result.insertId);
  });
};

module.exports.deleteDivision = (connection, divisionID, callback) => {
  connection.query(`DELETE FROM DivisionTable WHERE divisionID=${divisionID}`, function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, true);
  });
};


