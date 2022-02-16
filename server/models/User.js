const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function (next) {
  console.log('I am about to save', this.username, this.password);
  this.password += '|hello';
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;