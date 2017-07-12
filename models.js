const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    firstName: {type: String, default: ""},
    lastName: {type: String, default: ""}
  },
  username: {
    type: String,
    required: true,
    unique: true}
  // },
  // password: {
  //   type: String,
  //   required: true
  // },
  // contacts: []
});

userSchema.virtual('fullName').get(function() {
  return `${this.name.firstName} ${this.name.lastName}`.trim();
});

userSchema.methods.apiRepr = function() {
  return {
    username: this.username,
    name: this.fullName
  };
}

userSchema.methods.validatePassword = (password) => {
  return bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = (password) => {
  return bcryt.hash(password, 10);
}

const User = mongoose.model('User', userSchema);

module.exports = {User};
