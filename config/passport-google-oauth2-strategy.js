const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const env = require('./environment');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../models/user');

passport.use(new googleStrategy({
        clientID: env.google_client_ID,
        clientSecret: env.google_client_Secret,
        callbackURL: env.google_callback_URL,
    }, function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value})
        .then(function(user){
            // console.log(profile);
            if(user){
                return done(null, user);
            }else{
                const plainPassword = crypto.randomBytes(20).toString('hex');
                bcrypt.genSalt(10, function(err, salt){
                    if(err){
                        console.log(err);
                        return;
                    }
                    bcrypt.hash(plainPassword, salt, function(err, hashedPassword){
                        if(err){
                            console.log(err);
                            return;
                        }
                        User.create({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            password: hashedPassword
                        }).then(function(user){
                            return done(null, user);
                        }).catch(function(err){console.log(err); return;})
                    })
                })
                // User.create({
                //     name: profile.displayName,
                //     email: profile.emails[0].value,
                //     password: crypto.randomBytes(20).toString('hex')
                // }).then(function(user){return done(null, user)}).catch(function(err){console.log(err); return;})
            }
        }).catch(function(err){console.log(err); return;})
    }
));

module.exports = passport;