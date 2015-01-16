var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
  author: String,
  title: String,
  url: String,
  description: String
});
var Image = mongoose.model('images', imageSchema);

module.exports = Image;
