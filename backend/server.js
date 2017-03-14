// server.js BASE SETUP
// =============================================================================
// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Attendees = require('./app/models/attendees');

mongoose.connect('mongodb://localhost/test');

// configure app to use bodyParser() this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET
// http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

router.route('/attendees')

// create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function (req, res) {

        var attendee = new Attendees(); // create a new instance of the Bear model
        attendee.name = req.body.name; // set the bears name (comes from the request)
        attendee.QRCode = req.body.QRCode;
        attendee.Breakfast = req.body.Breakfast;
        attendee.Lunch = req.body.Lunch;
        attendee.Dinner = req.body.Dinner
        // save the bear and check for errors
        attendee.save(function (err) {
            if (err) 
                res.send(err);
            
            res.json({message: 'Attendee created!'});
        });

    })
    .get(function (req, res) {
        Attendees
            .find(function (err, attendees) {
                if (err) 
                    res.send(err);
                res.json(attendees);
            });
    });

router.route('/attendee/:QRCode')

// get the bear with that id (accessed at GET
// http://localhost:8080/api/bears/:bear_id)
    .get(function (req, res) {

        Attendees
            .find({
                "QRCode": req.params.QRCode
            }, function (err, attendee) {
                if (err) {
                    res.send(err);
                }
                res.json(attendee);
            });

    });
// get the bear with that id (accessed at GET
// http://localhost:8080/api/bears/:bear_id) .put(function (req, res) { // use
// our bear model to find the bear we want Attendees     .update({ "QRCode":
// req.params.QRCode     }, function (err, attende) {         if (err)
// res.send(err);         attende[0].Breakfast = req.body.Breakfast;
// attende[0].Lunch = req.body.Lunch;         attende[0].Dinner =
// req.body.Dinner;     });
});
// more routes for our API will happen here REGISTER OUR ROUTES
// ------------------------------- all of our routes will be prefixed with /api
app
.use('/api', router);

// START THE SERVER
// =============================================================================
app
.listen(port);
console
.log('Magic happens on port ' + port);
