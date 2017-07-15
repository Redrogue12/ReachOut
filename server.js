const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const {router: usersRouter} = require('./users/router');

// Converting mongoose promises into normal promises
mongoose.Promise = global.Promise;

//Importing constants
const {PORT, DATABASE_URL} = require('./config');

const app = express();

// Logging
app.use(morgan('common'));

app.use('/users/', usersRouter);

// Serve static public files
app.use(express.static('public'));

// Users routing file


app.listen(process.env.PORT || 8080);
mongoose.connect(DATABASE_URL);
