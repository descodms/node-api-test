const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//import model
require('./models/note');
//import routes
const routes = require('./routes/index');

require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle bad connections
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`🚫 → ${err.message}`);
});

//creates Express app
const app = express();

//takes raw request and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config routes
app.use('/', routes);

//server up
app.set('port', process.env.PORT);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

module.exports = app;
