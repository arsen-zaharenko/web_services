const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieSession = require('cookie-session')
require('./passport-setup');

let username = ''

app.use(cors())
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieSession({
    name: 'application-session',
    keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
    if(req.user){
        next();
    } else {
        res.sendStatus(401);
    }
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
app.get('/failed', (req, res) => res.send('You Failed to log on!'))
app.get('/good', isLoggedIn, (req, res) => res.send(`
    <div align="center">
        <h1>Hello, ${username}!</h1>
        <a href="/logout"><h2>Log out</h2></a>
    </div>
    `))

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    username = req.user.displayName
    res.redirect('/good');
});

app.get('/yandex', passport.authenticate('yandex'));

app.get('/yandex/callback', passport.authenticate('yandex', { failureRedirect: '/failed' }),
  function(req, res) {
    username = req.user.displayName
    res.redirect('/good');
});

app.get('/github', passport.authenticate('github'));

app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/failed' }),
  function(req, res) {
    username = req.user.username
    res.redirect('/good');
});

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.listen(3000, () => console.log(`Example app listening on port ${3000}`))