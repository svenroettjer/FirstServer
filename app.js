// Import HTTP module
var http = require('http');
var dispatcher = require("httpdispatcher");
var fileSystem = require('fs');
var path = require('path');

// define port
const PORT = 8080;


dispatcher.setStatic('resources');
dispatcher.setStaticDirname('.');

dispatcher.onGet("/", function (request, response) {
	response.write('<html>');
	response.write('<body>');
	//response.write('<script src="highcharts.js"></script>');
	response.write('<h1>Hello!</h1>');
	response.write('Prima, Du hast Dich auf meinen NodeJS Server verirrt :-)');

	response.write('<script src="http://code.highcharts.com/2.3.5/highcharts.js"></script>');
	//response.write('<script src="http://localhost:8080/highcharts2.js"></script>');
	response.write('<div id="container" style="height: 400px"></div>');

	response.write('<script>');

	response.write('var chart = new Highcharts.Chart({');

    response.write("chart: {renderTo: 'container'}, xAxis: {type: 'datetime'},");
    response.write('series: [{');
	response.write('data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],');
	response.write('pointStart: Date.UTC(2012, 0, 1),');
	response.write('pointInterval: 24 * 3600 * 1000, }]');
	response.write('});');

	response.write('</script>');

	//response.write('<div id="container" style="height: 300px"></div>');
	response.write('</body>');
	response.write('</html>');

	response.end();
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