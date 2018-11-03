var express = require('express');
var router = express.Router();
var moment = require('moment');

module.exports.readAvailabilityPerUmpire = (connection, umpireID, callback) =>{
  var currentDate = moment().format("YYYY-MM-DD");
  var result = [];
  var currentDay = [];
  connection.query("SELECT * FROM FixtureTable WHERE DateTime > CURRENT_TIMESTAMP", function(err, fixtures){
    if (err) callback(500, err);
    else fixtures.forEach(function(fixture){
      connection.query(`SELECT COUNT(*) FROM FixtureJunction WHERE fixtureFK=${fixture.fixtureID}`, function(err, noOfUmpires){
        if (err) callback(500, err);
        else if(noOfUmpires < fixture.NoOfUmpires){
          connection.query(`SELECT * FROM AvailabilityTable WHERE fixtureFK=${fixture.fixtureID} AND umpireFK=${umpireID} LIMIT 1`, function(err, availability){
            if (err) callback(500, err);
            else if(availability[0]){
              var thisDay = moment(fixture.DateTime).format("YYYY-MM-DD");
              if(currentDate !== thisDay){
                result.push({'Date': currentDate, 'Fixtures': currentDay});
                currentDate = thisDay;
                currentDay = [];
              }
              currentDay.push({'fixtureID': fixture.fixtureID, 'Availability': availability[0].Available});
            }
          });
        }
      });
    });
    callback(200, fixtures);
  });
};

module.exports.createAvailability = (connection, availability, callback) => {
  connection.query("INSERT INTO AvailabilityTable (umpireFK, fixtureFK, Available) VALUES ?", [availability.umpireFK, availability.fixtureFK, availability.Available], function(err, result, fields){
    if (err) callback(500, err)
    else callback(200, result.insertId);
  });
};

module.exports.updateAvailabilty = (connection, availabilityID, availability, callback) => {
  connection.query(`UPDATE AvailabilityTable SET umpireFK=${availability.umpireFK}, fixtureFK=${availability.fixtureFK}, Availabile=${availability.Available} WHERE availabilityID=${availabilityID}`, function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result.insertId);
  });
};

module.exports.deleteAvailability = (connection, availabilityID, callback) => {
  connection.query(`DELETE FROM AvailabilityTable WHERE umpireID=${availabilityID}`, function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, true);
  });
};


