var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://dmeowmixer:saltnpepper@ds063870.mongo.com:63870/winharder');
var bodyParser = require("body-parser");
app.use(express.static(__dirname + '../'));
app.set('views', __dirname + '/../views');
app.engine('html', require('jade').__express);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;

/* 

GET REQUEST to view list of gallery photos

*/
app.get('/', function (req, res){
  res.render("index.jade")
   



})





/*

GET /gallery/:id to see single photo
Each photo should include Delete link for itself
should include a edit 

*/





/*

GET new photo see new photo form
need
Author: text
Link: text img url
description: text area

*/



/*

POST to create a new gallery photo

*/

app.post('./', function (req, res){

  
})

/*

GET gallery :id/edit  to see edit form gallery photo indenfified
by id param
fields author:
link:
description:

*/





/*

PUt gallery/:id updates single gallery photo identified
by id param

*/


/*

DELETE gallery/:id to delete single photo

*/ 
app.delete('./', function (req, res){

  
})