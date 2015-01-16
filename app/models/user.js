var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String

});
userSchema.methods.validPassword = function (check_password) {
  return (passwordCrypt(check_password) === this.password);
};

var User = mongoose.model('users', userSchema);

module.exports = User;
