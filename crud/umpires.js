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
  connection.query("INSERT INTO UmpireTable (Firstname, Surname, Email, PhoneNumber, Password) VALUES ?", [req.body.Firstname, req.body.Surname, req.body.Email, req.body.PhoneNumber, req.body.Password], function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result.insertId);
  });
};

module.exports.updateUmpire = (connection, umpireID, umpire, callback) => {
  connection.query(`UPDATE UmpireTable SET Firstname=${umpire.Firstname}, Surname=${umpire.Surname}, Email=${umpire.Email}, PhoneNumber=${umpire.PhoneNumber}, Password=${umpire.Password} WHERE umpireID=${umpireID}`, function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, result.insertId);
  });
};

module.exports.deleteUmpire = (connection, umpireID, callback) => {
  connection.query(`DELETE FROM UmpireTable WHERE umpireID=${umpireID}`, function(err, result, fields){
    if (err) callback(500, err);
    else callback(200, true);
  });
};


