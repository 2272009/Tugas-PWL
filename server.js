var http = require('http');
var fs = require('fs');
var express = require('express');

var app = express();

// Serve static files from the 'dist' directory
app.use(express.static('dist'));

// Serve Bootstrap files as static resources
app.use('/node_modules/bootstrap', express.static(__dirname + '/node_modules/bootstrap'));

// Serve index.html
app.get('/index.html', function (req, res) {
    fs.readFile('dist/index.html', function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end("404 Not Found");
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
});

// Handle requests for the root URL
app.get('/', function (req, res) {
    res.redirect('/index.html');
});

var server = http.createServer(app);
server.listen(9000);