const mongoose = require('mongoose');
//EVENTS model

mongoose.Promise = global.Promise;

const eventSchema = mongoose.Schema({
  name: String,
  location: String,
  date: Date,
  userId: String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = {Event};
