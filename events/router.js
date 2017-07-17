const express = require('express');
const jsonParser = require('body-parser').json();

const{Event} = require('./models');

const eventRouter = express.Router();

eventRouter.use(jsonParser);

// Events GET Endpoints
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

// Events POST Endpoints
eventRouter.post('/', (req, res) => {
  const requiredFields = ['name', 'location', 'date', 'userId'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Event
    .create({
      name: req.body.name,
      location: req.body.location,
      date: req.body.date,
      userId: req.body.userId
    })
    .then(event => res.status(201).json(event))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'Error. Create event unsuccessful'});
    });
});

// Events DELETE Endpoint
eventRouter.delete('/:id', (req, res) => {
  Event
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(204).json({message: 'Delete successful'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'Error. Delete was not successful'})
    });
});

module.exports = {eventRouter};
