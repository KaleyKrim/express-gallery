//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const port = process.env.port || 8080;
const photosRoutes = require('./routes/photos');
const db = require('./models');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(methodOverride('_method'));

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname:'.hbs'
}));

app.set('view engine', '.hbs');

app.use('/gallery', photosRoutes);


app.listen(port, () => {
  db.sequelize.sync({ force: false });
  console.log(`Server listening on port: '${port}`);
});
