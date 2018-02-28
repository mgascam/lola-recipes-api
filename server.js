const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());


mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE);

mongoose.connection.on('error', () => {
    console.log('Could not connect to database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', () => {
    console.log('Succesfully connected to database');
});


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Lola Recipes application."});
});

require('./app/routes/routes')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});