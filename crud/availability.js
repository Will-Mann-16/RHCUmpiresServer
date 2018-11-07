
var moment = require('moment');
var db = require('./database');

module.exports.readAvailabilityPerUmpire = async (umpire) => {
    try {
        var fixtures = await db.read('FixtureTable', {condition: 'DateTime > CURRENT_TIMESTAMP'});
        var availability = await Promise.all(fixures.map(async (fixture, key) => {
            try {
                var noOfUmpires = await db.query(`SELECT COUNT(*) FROM FixtureJunction WHERE fixtureFK=${fixture.fixtureID}`);
                if (noOfUmpires < fixture.NoOfUmpires) {
                    try {
                        var available = await db.read('AvailabilityTable', {
                            condition: `fixtureFK=${fixture.fixtureID} AND umpireFK=${user.umpireID}`,
                            limit: 1
                        });
                        return {...fixture, Availability: available};
                    } catch (e) {
                        return null;
                    }
                }
            } catch (e) {
                return null;
            }
        }));
        var currentDate = moment().format("YYYY-MM-DD");
        var result = [];
        var currentDay = [];
        availability.forEach((fixture) => {
            var thisDay = moment(fixture.DateTime).format("YYYY-MM-DD");
            if (currentDate !== thisDay) {
                result.push({'Date': currentDate, 'Fixtures': currentDay});
                currentDate = thisDay;
                currentDay = [];
            }
            currentDay.push(fixture);
        });
        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject(err);
    }
};

module.exports.createAvailability = (availability) => {
    return db.create('AvailabilityTable', availability, {idSelector: 'availabilityID', returnRow: true});
};

module.exports.updateAvailability = (availabilityID, availability) => {
  return db.update('AvailabilityTable', availability, {idSelector: 'availabilityID', id: availabilityID, returnRow: true})
};

module.exports.deleteAvailability = (availabilityID) => {
  return db.delete('AvailabilityTable', {idSelector: 'availabilityID', id: availabilityID});
};


