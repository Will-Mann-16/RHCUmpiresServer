const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const {JWT_ENCRYPTION, JWT_EXPIRY} = require('../config');
router.post('/login', (req, res) => {
    passport.authenticate('local', {session: false}, (err, user) => {
        if(err || !user){
            return res.status(200).json({
                success: false,
                message: err ? 'Login Failed' : 'Incorrect Username & Password Combination'
            });
        }

        req.login(user, {session: false}, (err) => {
            if(err){
                return res.status(500).send(err);
            }
            const token = jwt.sign({umpireID: user.umpireID}, JWT_ENCRYPTION, {expiresIn: JWT_EXPIRY});
            return res.status(200).json({success: true, user, token});
        });

    })(req, res);
});

module.exports = router;