var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
    console.log(url.parse(req.url, true));
    res.writeHead(200, {
        'content-type': 'text/plain'
    });
    res.write('hello world');
    res.end();
}).listen(8132);
