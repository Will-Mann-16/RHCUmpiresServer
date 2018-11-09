const passport = require('passport');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const {JWT_ENCRYPTION} = require('./config');
const db = require('./database');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, callback) => {
    try {
        var user = await db.read('UmpireTable', {limit: 1, condition: `Email='${email}'`});
        if (user) {
            var result = await bcrypt.compare(password, user.Password);
            delete user.Password;
            if(result){
                delete user.Password;
                callback(null, user);
            } else {
                callback(null, false);
            }
        } else {
            callback(null, false);
        }
    } catch(e){
        callback(e, false);
    }
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_ENCRYPTION
}, (jwtPayload, callback) => {
    db.read('UmpireTable', {limit: 1, condition: `umpireID='${jwtPayload.umpireID}'`}).then(response => {
        delete response.Password;
        callback(null, response);
    }).catch(err => callback(err, null));
}));