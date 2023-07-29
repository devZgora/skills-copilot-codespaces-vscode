// Create web server
// 2016-03-12    PV

var http = require('http');
var url = require('url');
var fs = require('fs');

var comments = [];

var server = http.createServer(function(req, res) {
    console.log(req.method + " " + req.url);
    var urlp = url.parse(req.url, true);
    var pathname = urlp.pathname;
    var query = urlp.query;
    if (pathname == '/comments') {
        if (req.method == 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(comments));
        } else if (req.method == 'POST') {
            var data = '';
            req.on('data', function(chunk) {
                data += chunk;
            });
            req.on('end', function() {
                var comment = JSON.parse(data);
                comments.push(comment);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(comments));
            });
        }
    } else if (pathname == '/index.html') {
        fs.readFile('index.html', function(err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end("404 Not found");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("404 Not found");
    }
});

server.listen(8080);
console.log('Server running at http://localhost:8080/');