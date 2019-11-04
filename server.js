// server.js final


// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();// define our app using express
var bodyParser = require('body-parser');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true } ); // connect to our database

var Bingas = require('./app/models/lab3app.js');

var sanitizeHtml = require('sanitize-html');

var path = require('path');

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

app.use('/', express.static('/storestuff'));


app.use('/api', router);

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
router.route('/lab3app')

    // create a bear
    .post(function(req, res) {
        var bear = new Bingas();      // create a new instance of the Bear model
        console.log("name: " + req.body.name + " type: " + req.body.type + " quantity: " + req.body.quantity + " taxrate:  " + req.body.taxrate);
        bear.name = req.body.name;  // set the bears name (comes from the request)
        bear.type = req.body.type;
        bear.quantity = req.body.quantity;
        bear.loanperiod = req.body.loanperiod;

        // save the bear and check for errors
        bear.save(function(err) {
            console.log('savings')
            console.log(err);
            if (err)
                res.send(err);
            res.json({ message: 'Bear created!' });
        });
        console.log('fuck off');
    })
    
    .get(function(req, res) {
        Bingas.find(function(err, docs) {
            if (err)
                res.send(err);

            res.json(docs);
        });
    });

router.route('/lab3app/:bingas_id')


    .get(function(req, res) {
        Bingas.findById(req.params.bingas_id, function(err, bingas) {
            if (err)
                res.send(err);
            res.json(bingas);
        });
    })
    
     .put(function(req, res) {

        // use our bear model to find the bear we want
        Bingas.findById(req.params.bingas_id, function(err, bear) {

            if (err)
                res.send(err);
            
            console.log(req.body.quantity);
                
            if(req.body.name != undefined)
                bear.name = sanitizeHtml(req.body.name);  // update the bears info
                
            if(req.body.type != undefined)
                bear.type = sanitizeHtml(req.body.type);
                
            if(req.body.quantity != undefined)
                bear.quantity = sanitizeHtml(req.body.quantity);
                
            if(req.body.loanperiod != undefined)
                bear.loanperiod = sanitizeHtml(req.body.loanperiod);

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })
    
    .delete(function(req, res) {
        Bingas.remove({
            _id: req.params.bingas_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
    
app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/storestuff/store.html');
});
    
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


