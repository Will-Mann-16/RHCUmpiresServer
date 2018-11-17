var db = require('../database');

module.exports.readFixtures = () => {
    return db.read('FixtureTable', {});
};

module.exports.readFixture = (fixtureID) => {
    return db.read('FixtureTable', {condition: `fixtureID=${fixtureID}`, limit: 1});
};

module.exports.readFixturesPerUmpire = async (umpireID, future=true) => {
    try {
        var fixtures = await db.read('FixtureJunction', {columns: 'fixtureFK', condition: `umpireFK=${umpireID}`});
        var result = await Promise.all(fixtures.map(async ({fixtureFK}) => {
            return await db.read('FixtureTable', {condition: `fixtureID=${fixtureFK} AND DateTime ${future ? '>' : '<'} CURRENT_TIMESTAMP`, limit: 1});
        }));
        return Promise.resolve(result.filter(e => e.fixtureID));
    } catch (e) {
        return Promise.reject(e);
    }
};

module.exports.readUmpiresPerFixture = async (fixtureID) => {
    try {
        var umpires = await db.read('FixtureJunction', {columns: 'umpireFK', condition: `fixtureFK=${fixtureID}`});
        var result = Promise.all(umpires.map(async ({umpireFK}) => {
            var umpire = await db.read('UmpireTable', {condition: `umpireID=${umpireFK}`, limit: 1});
            delete umpire.Password;
            delete umpire.Admin;
            return umpire;
        }));
        return Promise.resolve(result);
    } catch (e) {
        return Promise.reject(e);
    }
}

module.exports.createFixture = (fixture) => {
    return db.create('FixtureTable', fixture, {returnRow: true, idSelector: 'fixtureID'});
};

module.exports.updateFixture = (fixtureID, fixture) => {
    return db.update('FixtureTable', fixture, {returnRow: true, idSelector: 'fixtureID', id: fixtureID});
};

module.exports.deleteFixture = (fixtureID) => {
    return db.delete('FixtureTable', {id: fixtureID, idSelector: 'fixtureID'});
};


