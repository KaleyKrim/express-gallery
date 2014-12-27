var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var secret = process.env.DBPASS;
mongoose.connect('mongodb://dmeowmixer:'+secret+'@ds027771.mongolab.com:27771/winharder');
var Schema = mongoose.Schema;
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// learn about middleware express and routing
// new schema and model
//  create random table to save to.


app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/../')); 
app.set('views', __dirname + '/../views');
app.engine('html', require('jade').__express);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;

var User = mongoose.model('user', {
  username: String,
  password: String

});

var Image = mongoose.model('image', {
  author: String,
  title: String,
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
// find all images except for the image that matches :id
      Image.find({_id: {'$ne': req.params.id }},function(err,sidebarimages){
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
// get the image by id, render edit template edit.jade, pass the image as a local (just like other route)
app.get('/gallery/:id/edit', function (req, res){
  Image.findOne({_id:req.params.id},function (err, image){
    if (err){
      throw err;
    }
    if (image){
      res.render("edit.jade", {image: image});
    }
  })
})






// ?PUt gallery/:id updates single gallery photo identifiedy id param



app.put('/gallery/:id', function (req, res){
  console.log(req.body)
  Image.findOne({_id:req.params.id},function (err, image){
    if (err){
      throw err;
    }
    if (image){
      image.url = req.body.url;
      image.author = req.body.author;
      image.title = req.body.title;
      image.description = req.body.description;
      image.save(function (err, image){
        if (err){
          throw err;
        }

      res.redirect(302,"/");
      })      
    }
    else {
      res.send(404);
    }
  })
});



// DELETE gallery/:id to delete single photo
// - `DELETE /gallery/:id` to delete a single gallery photo identified by the `:id` param
 
app.delete('/gallery/:id', function (req, res){
  console.log("delete",req.params.id);
  Image.findOneAndRemove({_id:req.params.id},function (err,image){
    if (err){
      throw err;
    }
    if (image){
      res.redirect(302,"/")
    }
  })
  
});

//user authentication

app.get('/login', function (req, res) {
  //res.render("login", { user: req.user, messages: req.flash('error') });
  res.render("login.jade")
});

app.post('/login', function (req, res){
  passport.authenticate('local', { successRedirect: '/secretRoom',
                                 failureRedirect: '/login',
                                 failureFlash: true })
  res.send("")
});

app.get('/secretRoom', function (req, res){
  res.send("welcome to the secret room")

});

app.get('/registration', function (req, res){
  res.render("registration.jade")
});

app.post('/registration', function (req, res){
  var user = new User(req.body);
  user.save(function (err, user){
    if (err){
      throw err;
    }
    res.redirect('/');
  })
});


var server = app.listen(3000, function (){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port)
});