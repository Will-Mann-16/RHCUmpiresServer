
module.exports.readVenues = () => {
    return db.read('VenueTable');
};

module.exports.readVenue = (venueID) => {
    return db.read('VenueTable', {condition: `venueID=${venueID}`, limit: 1});
};

module.exports.createVenue = (venue) => {
    return db.create('VenueTable', venue, {returnRow: true, idSelector: 'venueID'});
};

module.exports.updateVenue = (venueID, venue) => {
    return db.update('VenueTable', venue, {returnRow: true, idSelector: 'venueID', id: venueID});
};
module.exports.deleteVenue = (venueID) => {
    return db.delete('VenueTable', {id: venueID, idSelector: 'venueID'});
};


