//lalala
var express    = require('express');        // call express
var app        = express();// define our app using express
var bodyParser = require('body-parser');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose   =require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true } ); // connect to our database

var Bingas = require('./app/models/lab3app.js');
console.log("wazzap");
Bingas.find(function(err, docs) {

            if (err)
                res.send(err);
            console.log(docs);
            res.json(docs);
        });