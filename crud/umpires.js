var qualificationCRUD = require("./qualifications");

module.exports.readUmpires = (connection, callback) => {
  connection.query("SELECT * FROM UmpireTable", function(err, result){
    if(err) callback(500, err);
    else{
      var umpires = [];
      result.map(umpire => {
        qualificationCRUD.readUmpireQualifiaction(connection, umpire.umpireID, (status, result) => {
          if(status === 500) callback(500, result);
          else umpires.push({...umpire, result});
        });
      });
    }
  });
};

module.exports.readUmpire = (connection, umpireID, callback) => {
connection.query("SELECT * FROM UmpireTable WHERE umpireID=" + umpireID + " LIMIT 1", function(err, result, fields){
    if (err) callback(500, err);
    else qualificationCRUD.readUmpireQualifiaction(connection, umpireID, (status, qualifications) => {
      if (status === 500) callback(500, qualifications);
      else callback(200, {...result[0], qualifications});
    });
  });
};

module.exports.createUmpire = (connection, umpire, callback) => {
    return db.create('FixtureTable', fixture, {returnRow: true, idSelector: 'fixtureID'});
};

module.exports.updateUmpire = (connection, umpireID, umpire, callback) => {
    return db.update('FixtureTable', fixture, {returnRow: true, idSelector: 'fixtureID', id: fixtureID});
};

module.exports.deleteUmpire = (connection, umpireID, callback) => {
    return db.delete('FixtureTable', {id: fixtureID, idSelector: 'fixtureID'});
};


