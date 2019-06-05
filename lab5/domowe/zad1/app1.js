// No use of the template system
var express = require('express'),
    logger = require('morgan');
var app = express();
var x = 1;
var y = 2;

// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Place an HTTP request recorder on the stack - each request will be logged in the console in 'dev' format
app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' - static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

// Route definitions
app.get('/', (req, res) => {     // The first route
    res.send(`${x} + ${y} = ${x + y}`); // Send a response to the browser
});

app.get('/add/:x/:y', (req, res) => {
    res.send(`${req.params.x} + ${req.params.y} = ${parseInt(req.params.x) + parseInt(req.params.y)}`);
});

// The application is to listen on port number 9000
app.listen(9000, function () {
    console.log('The application is available on port 9000');
});