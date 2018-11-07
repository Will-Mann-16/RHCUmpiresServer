
module.exports.readVenues = (connection, callback) => {
    return db.read('FixtureTable');
};

module.exports.readVenue = (connection, venueID, callback) => {
    return db.read('FixtureTable', {condition: `fixtureID=${fixtureID}`, limit: 1});
};

module.exports.createVenue = (connection, venue, callback) => {
    return db.create('FixtureTable', fixture, {returnRow: true, idSelector: 'fixtureID'});
};

module.exports.updateVenue = (connection, venueID, venue, callback) => {
    return db.update('FixtureTable', fixture, {returnRow: true, idSelector: 'fixtureID', id: fixtureID});
};
module.exports.deleteVenue = (connection, venueID, callback) => {
    return db.delete('FixtureTable', {id: fixtureID, idSelector: 'fixtureID'});
};


