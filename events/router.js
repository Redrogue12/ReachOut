const express = require('express');
const jsonParser = require('body-parser').json();

const{Event} = require('./models');

const eventRouter = express.Router();

eventRouter.use(jsonParser);

// Events GET ENDPOINT
eventRouter.get('/', (req, res) => {
  Event
    .find()
    .exec()
    .then(events => {
      res.status(200).json(events);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'GET error'});
    });
});

eventRouter.get('/:id', (req, res) => {
  Event
    .findById(req.params.id)
    .exec()
    .then(event => res.json(event))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'There was an error retrieving your event'});
    });
});

module.exports = {eventRouter};
