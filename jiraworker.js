var https = require('https');
var fileSystem = require('fs');
var path = require('path');


var run = function () {
    var options = {
        host: 'smarthouse-boerse-muenchen.atlassian.net',
        port: 443,
        path: '/issues/?jql=project%20%3D%20REL%20AND%20resolved%20%3E%3D%202016-06-29%20AND%20resolved%20%3C%3D%202016-07-08',
        method: 'GET',
    };

    https.request(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    }).end();
}

module.exports = {
    run: run
}