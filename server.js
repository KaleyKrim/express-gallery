//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const port = process.env.port || 8080;
const photosRoutes = require('./routes/photos');
const db = require('./models');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const Photo = db.photo;
const User = db.user;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname:'.hbs'
}));

app.set('view engine', '.hbs');


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log('serializing');
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser((user, done) => {
  console.log('deserializing');
  User.findOne({ where: { id: user.id }})
  .then(user => {
    return done(null, {
      id: user.id,
      username: user.username
    });
  });
});

passport.use(new LocalStrategy(function(username, password, done){
  User.findOne({ where: { username: username } })
  .then (user => {
    if(user === null){
      return done(null, false, {message: 'bad username or password'});
    }else{
      bcrypt.compare(password, user.password)
      .then(res => {
        console.log(res);
        if(res){
          return done(null, user); //<<<--limit user access
        }else{
          return done(null, false, {message: 'bad username or password'});
        }
      });
    }
  })
  .catch(err => { console.log('error: ', err);});
}));


app.get('/', (req, res) => {
  return Photo.findAll()
  .then(photos => {
    let locals = { photos : photos};
    return res.render('./index', locals);
  });
});

app.get('/register', (req, res) => {
  res.render('./register');
});

app.get('/login', (req, res) => {
  res.render('./login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/'
}));

app.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

app.post('/register', (req, res) => {
  bcrypt.genSalt(saltRounds, function(err, salt){
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      User.create({
        username: req.body.username,
        password: hash
      })
      .then((user) => {
        console.log('user', user);
        res.redirect('/');
      })
      .catch((err) => { return res.send('Nope nope nope'); });
    });
  });
});

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/');
  }
}

app.get('/secret', isAuthenticated, (req, res) => {
  res.send('you found the secret!');
});



app.use('/gallery', photosRoutes);


app.listen(port, () => {
  db.sequelize.sync({ force: false });
  console.log(`Server listening on port: '${port}`);
});
