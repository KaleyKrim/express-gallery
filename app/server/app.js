var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var secret = process.env.DBPASS;
mongoose.connect('mongodb://dmeowmixer:'+secret+'@ds027771.mongolab.com:27771/winharder');
var session = require('express-session');
var Schema = mongoose.Schema;
var methodOverride = require('method-override');
var crypto = require('crypto');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// middlewares

app.use(methodOverride('_method'));

/*

  Express JS session cookie ID and secret pass

*/

app.use(session(
{
  secret: 'faka wot',
  resave: false,
  saveUninitialized: true
}));

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('jade').__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/../views');
app.use(express.static(__dirname + '/../')); 
app.use(passport.initialize());
app.use(passport.session());
module.exports = app;


/*

  Passport session start upon user identification and verify.

*/
passport.serializeUser(function(user, done) {
  console.log(user);
    done(null, user);
});

/*

  Passport session end!

*/
 
passport.deserializeUser(function(obj, done) {
  console.log(obj);
    User.findById(obj._id, function (err, user){
      if (err) throw err;
      console.log(user);
      done(err, user);
    })
    
});


/*

  Finds one User with the username : ***** runs validation check

*/
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      console.log("local strategy", user.validPassword(password));
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

/*

  New Schema and Model

*/

var userSchema = mongoose.Schema({
  username: String,
  password: String

});

/*

  Defines the validPassword function

*/
userSchema.methods.validPassword = function (check_password) {
  return (passwordCrypt(check_password) === this.password);
};

var User = mongoose.model('users', userSchema);

/*

  Image model

*/
var Image = mongoose.model('image', {
  author: String,
  title: String,
  url: String,
  description: String
});

/* 

  GET REQUEST to view list of gallery photos

*/

function get(url){
  // return new promise
  return new Promise(function (resolve,reject){
    var req = new XMLHttpRequest();
    req.open('GET',url);
    req.onload = function(){
      // Check if the request is ok with code 200
      if (req.status === 200){
        resolve(req.response);
      }
      else {
        // reject w/ error message
        reject(Error(req.statusText));
      }
    };
    // this will handle Network Errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };
    // If everythings good, make the request
    req.send();
  })
}


app.get('/', function (req, res){
  Image.find({}, function (err, docs){
    if (err) {
      throw err;
    }

    var last = [];
    var newArray =[];
    //itterates through images and pushed 3 into new array for .thumbnail_photos
    for(var i = 0; i <docs.length; i += 3) {
      var row = [
      docs[i],
      docs[i+1],
      docs[i+2]
      ];  
      var filteredArray = row.filter(removeUndefined);
      newArray.push(filteredArray);  
    }
    function removeUndefined(elements) {
      return elements !== undefined;
      // if idex is not undefined
    }
    last.push(docs.pop());
    res.render("index.jade",{
      images: docs,
      header: last,
      content: newArray //to render 3 column rows
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

  Get the image by id, render edit template edit.jade, pass the image as a local (just like other route)

*/

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





/*

  Put gallery/:id updates single gallery photo identified by id param

*/

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


app.get('/secretRoom', ensureAuthenticated, function (req, res){
  res.send("welcome to the secret room")

});


function ensureAuthenticated(req, res, next){
  console.log(req.user)
  console.log(req.isAuthenticated())
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}



app.get('/registration', function (req, res){
  res.render("registration.jade")
});

//Saves user registration info

//checking if username exists
app.post('/registration', function (req, res){

  
  User.findOne({username: req.body.username}, function(err, user){
    if (err) {
      return err;
    };
    if (user){
      res.send("User ID Already Exists")
    } else{
      req.body.password = passwordCrypt(req.body.password);
  
      var user = new User(req.body);
      user.save(function (err, user){
        if (err){
          throw err;
        }
        res.redirect('/');
      })    
    }
  });
});

//post request authentication
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/secretRoom',
    failureRedirect: '/login',
    failureFlash: false
  })

);

app.get('/login', function(req,res){
  res.render("login", {user: req.user, messages: "error"})
});

//post log out
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});
  

var server = app.listen(3000, function (){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port)
});

function passwordCrypt(password) {
  var salt = process.env.SALT;
    var user_password = password;
    var salted_user_password = user_password + salt; //plz pass the salt
    var shasum = crypto.createHash('sha512');
    shasum.update( salted_user_password );
    var input_result = shasum.digest('hex');
  
    // req.body.password = input_result;
    return input_result
}