// Import HTTP module
var http = require('http');
var dispatcher = require("httpdispatcher");
var fileSystem = require('fs');
var path = require('path');

// define port
const PORT = 8080;


dispatcher.setStatic('resources');
dispatcher.setStaticDirname('.');

dispatcher.onGet(/\//, function (request, response) {
    var now = new Date();

	// var filename = "/index.html"; 
    var filename = request.url || "/index.html";
	var ext = path.extname(filename);
	var localPath = __dirname;
		
    localPath += filename;

    fileSystem.exists(localPath, function (exists) {
        if (exists) {
            console.log("Serving file: " + localPath);
            getFile(localPath, response, ext);
        } else {
            console.log("File not found: " + localPath);
            response.writeHead(404);
            response.end();
        }
    });
   /* path.exists(localPath, function (exists) {
        if (exists) {
            console.log("Serving file: " + localPath);
            getFile(localPath, response, ext);
        } else {
            console.log("File not found: " + localPath);
            response.writeHead(404);
            response.end();
        }
    });
    */
});


dispatcher.onGet("/highcharts.js", function (request, response) {

	var filePath = path.join(__dirname, 'highcharts.js');
    var stat = fileSystem.statSync(filePath);

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(response);
});

dispatcher.onGet("/highcharts2.js", function (request, response) {

	var filePath = path.join(__dirname, 'highcharts2.js');
    var stat = fileSystem.statSync(filePath);

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(response);
});

dispatcher.onPost("/page2", function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Page Two');
});

dispatcher.beforeFilter(/\//, function (req, res, chain) { //any url 
	console.log("Before filter");
	chain.next(req, res, chain);
});

dispatcher.afterFilter(/\//, function (req, res, chain) { //any url 
	console.log("After filter");
	chain.next(req, res, chain);
});

dispatcher.onError(function (req, res) {
	res.writeHead(404);
});


var server = http.createServer(function (req, res) {
	dispatcher.dispatch(req, res)
});

server.listen(PORT, function () {
	console.log('Server listening on http://localhost:%s', PORT);
});

function getFile(localPath, res, mimeType) {
	fileSystem.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			res.setHeader("Content-Type", mimeType);
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
});
}