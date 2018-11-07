var db = require('../database');

module.exports.readFixtures = () => {
    return db.read('FixtureTable');
};

module.exports.readFixture = (fixtureID) => {
    return db.read('FixtureTable', {condition: `fixtureID=${fixtureID}`, limit: 1});
};

module.exports.readFixturesPerUmpire = async (umpireID) => {
    try {
        var fixtures = await db.read('FixtureJunction', {columns: 'fixtureFK', condition: `umpireFK=${umpireID}`});
        var result = Promise.all(fixtures.map(async ({fixtureFK}) => {
            return await db.read('FixtureTable', {condition: `fixtureID=${fixtureFK}`, limit: 1});
        }));
        return Promise.resolve(result);
    } catch(e){
        return Promise.reject(e);
    }
};

module.exports.readUmpiresPerFixture = async (fixtureID) => {
    try {
        var umpires = await db.read('FixtureJunction', {columns: 'umpireFK', condition: `fixtureFK=${fixtureID}`});
        var result = Promise.all(umpires.map(async ({umpireFK}) => {
            return await db.read('UmpireTable', {condition: `umpireID=${umpireFK}`, limit: 1});
        }));
        return Promise.resolve(result);
    } catch(e){
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


