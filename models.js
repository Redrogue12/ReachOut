const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    firstName: {type: String, default: ""},
    lastName: {type: String, default: ""}
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contacts: []
});

userSchema.virtual('fullName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

userSchema.methods.apiRepr = () => {
  return {
    username: this.username || '',
    name: this.fullName || ''
  };
}
