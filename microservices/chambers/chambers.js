const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8081;
const app = express();

app.use(bodyParser.json());

const chamber_type = [
  {id: 0, name: 'one-seater'},
  {id: 1, name: 'two-seater'},
  {id: 2, name: 'three-seater'},
  {id: 3, name: 'punishment cell'}
];

const chambers = [
  {
    id: 0,
    type: 0,
    number: '12B'
  },
   {
    id: 1,
    type: 1,
    number: '45E'
  },
   {
    id: 2,
    type: 2,
    number: '87R'
  },
   {
    id: 3,
    type: 2,
    number: '32F'
  },
   {
    id: 4,
    type: 3,
    number: '77U'
  },
];

app.get('/chambers', (req, res) => {
  console.log('Returning chambers list');
  res.send(chambers);
});

app.get('/chamber-types', (req, res) => {
  console.log('Returning chamber types list');
  res.send(chamber_type);
});

app.post('/chamber/**', (req, res) => {
  const chamberId = parseInt(req.params[0]);
  const foundChamber = chambers.find(subject => subject.id === chamberId);

  if (foundChamber) {
      for (let attribute in foundChamber) {
          if (req.body[attribute]) {
              foundChamber[attribute] = req.body[attribute];
              console.log(`Set ${attribute} to ${req.body[attribute]} in chamber: ${chamberId}`);
          }
      }
      res.status(202).header({Location: `http://localhost:${port}/chamber/${foundChamber.id}`}).send(foundChamber);
  } else {
      console.log(`chamber not found.`);
      res.status(404).send();
  }
});

console.log(`chambers service listening on port ${port}`);
app.listen(port);