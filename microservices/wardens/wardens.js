const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const port = 8082;
const app = express();

app.use(bodyParser.json());

const prisonersService = 'http://localhost:8080';

const warden_rank = [
  {id: 0, name: 'Warden Grade II'},
  {id: 1, name: 'Warden Grade I'},
  {id: 2, name: 'Senior Warden'}
];

const wardens = [
    {
        id: 0,
        name: 'Paul',
        surname: 'Gosling',
        rank: 2,
        is_fired: false,
    },
    {
        id: 1,
        name: 'Nick',
        surname: 'Franco',
        rank: 1,
        is_fired: false,
    },
    {
        id: 2,
        name: 'Ricardo',
        surname: 'Tusa',
        rank: 1,
        is_fired: false,
    },
    {
        id: 3,
        name: 'Terence',
        surname: 'Gillespie',
        rank: 0,
        is_fired: false,
    },
    {
        id: 4,
        name: 'Damon',
        surname: 'Neal',
        rank: 0,
        is_fired: false,
    },
    {
        id: 5,
        name: 'Zak',
        surname: 'Christian',
        rank: 0,
        is_fired: false,
    },
    {
        id: 6,
        name: 'Chad',
        surname: 'Sparks',
        rank: 0,
        is_fired: false,
    },
];

app.get('/wardens', (req, res) => {
    console.log('Returning wardens list');
    res.send(wardens);
});

app.get('/warden-ranks', (req, res) => {
    console.log('Returning warden ranks list');
    res.send(warden_rank);
});

app.post('/punish', (req, res) => {
    request.post({
        headers: { 'content-type': 'application/json' },
        url: `${prisonersService}/punish/${req.body.prisonerId}`,
    }, (err, prisonerResponse, body) => {
        if (!err) {
            const wardenId = parseInt(req.body.wardenId);
            const warden = wardens.find(subject => subject.id === wardenId);
            warden.is_fired = true;
            res.status(202).send(`${warden.name} ${warden.surname} is fired!`);
        } else {
            res.status(400).send({ problem: `prisoner Service responded with issue ${err}` });
        }
    });
});

console.log(`wardens service listening on port ${port}`);
app.listen(port);