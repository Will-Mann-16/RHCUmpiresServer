
module.exports.readVenues = (connection, callback) => {
  connection.query("SELECT * FROM VenueTable", function(err, result, fields){
    if(err) callback(500, err);
    else callback(200, result);
  });
};

module.exports.readVenue = (connection, venueID, callback) => {
  connection.query("SELECT * FROM VenueTable WHERE venueID=" + venueID + " LIMIT 1", function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result[0]);
  });
};

module.exports.createVenue = (connection, venue, callback) => {
  connection.query("INSERT INTO VenueTable (Name, Address) VALUES ?", [venue.Name, venue.Address], function(err, result, fields){
    if (err) return callback(500, error);
    else callback(200, result.insertId);
  });
};

module.exports.updateVenue = (connection, venueID, venue, callback) => {
  connection.query(`UPDATE VenueTable SET Name='${venue.Name}', Address='${venue.Address}' WHERE venueID=${venueID}`, function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result.insertId);
  });
};
module.exports.deleteVenue = (connection, venueID, callback) => {
  connection.query(`DELETE FROM VenueTable WHERE venueID=${venueID}`, function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, true);
  });
};


