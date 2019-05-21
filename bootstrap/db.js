
const mongoose = require('mongoose');

const config = require('config');

const db = config.get('database.name');
const ip = config.get('database.ip');
const port = config.get('database.port');

const uri = `mongodb://${ip}:${port}/${db}`;

mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(() => {
        console.log('Successfuly connected to database!');
    })
    .catch(err => {
        console.log(err);
        console.log('Error connecting to database');
    });


module.exports = mongoose;