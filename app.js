
const express = require('express');

var app = express();


require('./middleware')(app);


require('./bootstrap/db');


require('./routes')(app);


require('./middleware/errorHandler')(app);


module.exports = app;
