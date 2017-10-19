//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.port || 8080;
const db = require('./models');
const User = db.user;

app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {

// });

app.listen(port, () => {
  db.sequelize.sync({ force: false });
  console.log(`Server listening on port: '${port}`);
});
