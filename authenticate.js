var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); //used to create, sign, and verify tokens
var config = require('./config');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_playload, done) => {
    console.log('JWT playload: ', jwt_playload);
    User.findOne({ _id: jwt_playload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyAdmin = function (req, res, next) {
  if (req.user.admin) {
    next();
    return;
  } else {
    var err = new Error('You are not authorized to perform this operation!');
    err.status = 403;
    return next(err);
  }
};

exports.googlePassport = passport.use(
  new GoogleStrategy(
    {
      clientID: 'GOOGLE_CLIENT_ID',
      clientSecret: 'GOOOGLE_CLIENT_SECRET',
      callbackURL: 'http://localhost:8000/users/google/callback',
      proxy: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (!err && user !== null) {
          return done(null, user);
        } else {
          user = new User({ username: profile.displayName });
          user.googleId = profile.id;
          user.firstname = profile.name.givenName;
          user.lastname = profile.name.familyName;
          user.save((err, user) => {
            if (err) return done(err, false);
            else return done(null, user);
          });
        }
      });
    }
  )
);
