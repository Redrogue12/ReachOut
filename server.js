const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const {BasicStrategy} = require('passport-http');
const jsonParser = require('body-parser').json();

// Converting mongoose promises into normal promises
mongoose.Promise = global.Promise;

//Importing constants
const {PORT, DATABASE_URL} = require('./config');

// User model
const {User} = require('./models')

const app = express();

// Logging
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(jsonParser);

// Serve static public files
app.use(express.static('public'));

// BASIC STRATEGY
const basicStrategy = new BasicStrategy((username, password, callback) => {
  let user;
  User
    .findOne({username: username})
    .exec()
    .then(_user => {
      user = _user;
      if (!user) {
        return callback(null, false);
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return callback(null, false);
      }
      else {
        return callback(null, user);
      }
    })
    .catch(err => callback(err));
});

passport.use(basicStrategy);
app.use(passport.initialize());

// ENDPOINTS
app.get('/users', (req, res) => {
  User
    .find()
    .exec()
    .then(users => {
      res.json(users.map(user => user.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'GET error'});
    });
});

app.post('/users', (req, res) => {
  if (!req.body) {
    return res.status(400).json({message: 'No request body'});
  }

  if (!('username' in req.body)) {
    return res.status(422).json({message: 'Missing field: username'});
  }

  let {firstName, lastName, username, password} = req.body;

  if (typeof username !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: username'});
  }

  username = username.trim();

  if (username === '') {
    return res.status(422).json({message: 'Incorrect field length: username'});
  }

  if (!(password)) {
    return res.status(422).json({message: 'Missing field: password'});
  }

  if (typeof password !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: password'});
  }

  password = password.trim();

  if (password === '') {
    return res.status(422).json({message: 'Incorrect field length: password'});
  }

  console.log(firstName, lastName, username, password);

  // check for existing user
  return User
    .find({username})
    .count()
    .exec()
    .then(count => {
      if (count > 0) {
        return res.status(422).json({message: 'username already taken'});
      }
      // if no existing user, hash password

      return User.hashPassword(password);
    })
    .then(hash => {
      console.log(hash);
      return User
        .create({
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: hash
        })
    })
    .then(user => {
      return res.status(201).json(user.apiRepr());
    })
    .catch(err => {
      res.status(500).json({message: 'Internal server error'})
    });
});


app.listen(process.env.PORT || 8080);
mongoose.connect(DATABASE_URL);
