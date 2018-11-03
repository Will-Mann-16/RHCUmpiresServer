var express = require('express');
var router = express.Router();

module.exports.readClubs = (connection, callback) => {
  connection.query("SELECT * FROM ClubTable", function(err, result, fields){
    if(err) callback(500, err);
    else callback(200, result);
  });
};

module.exports.readClub = (connection, clubID, callback) => {
  connection.query("SELECT * FROM ClubTable WHERE clubID=" + clubID + " LIMIT 1", function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result[0]);
  });
};

module.exports.createClub = (connection, club, callback) => {
  connection.query("INSERT INTO ClubTable (Name) VALUES ?", [club.Name], function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result.insertId);
  });
};

module.exports.updateClub = (connection, clubID, club, callback) => {
  connection.query(`UPDATE ClubTable SET Name='${club.Name}' WHERE clubID=${clubID}`, function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result.insertId);

  });
};

module.exports.deleteClub = (connection, clubID, callback) => {
  connection.query(`DELETE FROM ClubTable WHERE clubID=${clubID}`, function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, true);
  });
};


