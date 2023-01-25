const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const YandexStrategy = require('passport-yandex').Strategy;
const GithubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done){
    done(null, user);
})

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: '800024353089-t9fqbhs21ilhlh4qr4vq6hubp4b0qke6.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.use(new YandexStrategy({
    clientID: 'c223f03e50f943a5b6a3c765a0497363',
    clientSecret: 'eef43cc26a0b42a48a42cdbdad40c696',
    callbackURL: "http://localhost:3000/yandex/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.use(new GithubStrategy({
    clientID: '790c894adc657e3e58df',
    clientSecret: 'fcaf14d891271612bbab6945420cc2fefe692b06',
    callbackURL: "http://localhost:3000/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));
