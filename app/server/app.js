var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var secret = process.env.DBPASS;
mongoose.connect('mongodb://dmeowmixer:'+secret+'@ds027771.mongolab.com:27771/winharder');
var Schema = mongoose.Schema;


// new schema and model
//  create random table to save to.



app.use(express.static(__dirname + '/../')); 
app.set('views', __dirname + '/../views');
app.engine('html', require('jade').__express);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;

var Image = mongoose.model('image', {
  author: String,
  url: String,
  description: String
});

/* 

GET REQUEST to view list of gallery photos

*/


app.get('/', function (req, res){
  Image.find({}, function (err, docs){
    if (err) {
      throw err;
    }
    res.render("index.jade",{
      images: docs
    });
  });
});



app.get('/new_photo', function (req, res){
  res.render("newphoto.jade");
})


/*

GET /gallery/:id to see single photo
Each photo should include Delete link for itself
should include a edit 

*/

// params id accesses whatever is after the gallery/
app.get('/gallery/:id', function (req, res){
  Image.findOne({_id:req.params.id},function (err, image){
    if (err){
      throw err;
    }
    if (image){

      Image.find({},function(err,sidebarimages){
        if (err){
          throw err;
        }
        res.render("show.jade", {image: image, sidebarimages: sidebarimages});
      });   
    }
    else {
      res.send(404);
    }
  })
});




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

app.post('/gallery',function (req, res){
  var image = new Image(req.body);
  image.save(function (err, image){
    if (err){
      throw err;
    }
    res.redirect('/');
  });



});

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

app.put('/gallery/:id', function (req, res){

});

/*

DELETE gallery/:id to delete single photo

*/ 
app.delete('/', function (req, res){

  
});

var server = app.listen(3000, function (){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port)
});
