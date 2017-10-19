//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const port = process.env.port || 8080;
const db = require('./models');
const Photo = db.photo;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(methodOverride('_method'));

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname:'.hbs'
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  return Photo.findAll()
  .then(photos => {
    let locals = { photos : photos};
    console.log('photos', photos);
    return res.render('./index', locals);
  });
});

app.post('/gallery', (req, res) => {
  const author = req.body.author;
  const link = req.body.link;
  const description = req.body.description;

  return Photo.create({ author: author, link: link, description: description})
    .then(newPhoto => {
      //res.render()
      return res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
});
//render new photo handlebars
app.get('/gallery/new', (req, res) => {
  res.render('./new');
});

app.get('/gallery/:id', (req, res) => {
  const photoId = req.params.id;

  return Photo.findById(photoId)
  .then(photo => {
    console.log('photo.datavalues', photo.dataValues);
    let locals = photo.dataValues;
    return res.render('./photo', locals);
  });
});

app.get('/gallery/:id/edit', (req, res) => {
  const photoId = req.params.id;
  return Photo.findById(photoId)
    .then(photo => {
      let locals = photo.dataValues;
      return res.render('./edit', locals);
    });
});

app.listen(port, () => {
  db.sequelize.sync({ force: false });
  console.log(`Server listening on port: '${port}`);
});
