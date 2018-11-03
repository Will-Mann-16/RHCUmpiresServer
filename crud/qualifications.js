var express = require('express');
var router = express.Router();

module.exports.readQualifications = (connection, callback) => {
  connection.query("SELECT * FROM QualificationTable", function(err, result, fields){
    if(err) callback(500, err);
    else callback(200, result);
  });
};
module.exports.readUmpireQualifiaction = (connection, umpireID, callback) => {
  connection.query(`SELECT qualificationFK FROM QualificationJunction WHERE umpireFK=${umpireID}`, function (err, result, fields) {
    if (err) callback(500, err);
    else {
      var finalResult = [];
      result.forEach(({qualificationFK}) => {
          module.exports.readQualification(connection, qualificationFK, (status, result) => {
            if (status === 500) callback(500, err);
            else finalResult.push(result);
          });
      });
      callback(200, finalResult);
    }
  });
};

module.exports.readQualification = (connection, qualificationID, callback) => {
  connection.query("SELECT * FROM QualificationTable WHERE qualificationID=" + qualificationID + " LIMIT 1", function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result[0]);
  });
};

module.exports.createQualification = (connection, qualification, callback) => {
  connection.query("INSERT INTO QualificationTable (Name) VALUES ?", [qualification.Name], function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result.insertId);
  });
};

module.exports.updateQualification = (connection, qualificationID, qualification, callback) => {
  connection.query(`UPDATE QualificationTable SET Name='${qualification.Name}' WHERE qualificationID=${qualificationID}`, function(err, result, fields){
        if (err) callback(500, err);
        else callback(200, result.insertId);
  });
};

module.exports.deleteQualification = (connection, qualificationID, callback) => {
  connection.query(`DELETE FROM QualificationTable WHERE qualificationID=${qualificationID}`, function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, true);
  });
};


