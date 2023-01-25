const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const port = 8080;
const app = express();

app.use(bodyParser.json());

const chambersService = 'http://localhost:8081';

const prisoners = [
    {
        id: 0,
        name: 'John',
        surname: 'Davidson',
        chamberId: 0,
        healthStatus: 'good'
    },
    {
        id: 1,
        name: 'Mike',
        surname: 'Jackson',
        chamberId: 1,
        healthStatus: 'good'
    },
    {
        id: 2,
        name: 'Tom',
        surname: 'Green',
        chamberId: 1,
        healthStatus: 'good'
    },
    {
        id: 3,
        name: 'Rayan',
        surname: 'Paulson',
        chamberId: 2,
        healthStatus: 'good'
    },
    {
        id: 4,
        name: 'Barry',
        surname: 'Rook',
        chamberId: 2,
        healthStatus: 'good'
    },
];

app.get('/prisoners', (req, res) => {
    console.log('Returning prisoners list');
    res.send(prisoners);
});

app.post('/punish/**', (req, res) => {
  const prisonerId = parseInt(req.params[0]);
  const foundPrisoner = prisoners.find(subject => subject.id === prisonerId);

  if (foundPrisoner) {
      foundPrisoner.healthStatus = 'bad'
      res.status(202).header({Location: `http://localhost:${port}/punish/${foundPrisoner.id}`}).send(foundPrisoner);
  } else {
      console.log(`prisoner not found.`);
      res.status(404).send();
  }
});

app.post('/resettle', (req, res) => {
    request.post({
        headers: { 'content-type': 'application/json' },
        url: `${chambersService}/chamber/${req.body.chamberId}`,
    }, (err, chamberResponse, body) => {
        if (!err) {
            const prisonerId = parseInt(req.body.prisonerId);
            const prisoner = prisoners.find(subject => subject.id === prisonerId);
            prisoner.chamberId = req.body.chamberId;
            res.status(202).send(prisoner);
        } else {
            res.status(400).send({ problem: `chamber Service responded with issue ${err}` });
        }
    });
});

console.log(`prisoners service listening on port ${port}`);
app.listen(port);