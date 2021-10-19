const
    fs          = require('fs'),
    server_conf = require('./test/server.js'),
    client_conf = require('./test/client.js'),
    ca_certs    = [
        fs.readFileSync('./test/ca.cert'),
        fs.readFileSync('../root/ca.cert')
    ],
    https       = require('https'),
    test_port   = 8091;

https.createServer({
    key:  server_conf.key,
    cert: server_conf.cert,
    ca:   ca_certs
}, (server_request, server_response) => {
    console.log('request received');
    console.log(server_request.headers);
    server_response.end();
    console.log('response send');
}).listen(test_port, () => {
    const client_request = https.request('https://localhost:' + test_port, {
        key:  client_conf.key,
        cert: client_conf.cert,
        ca:   ca_certs
    }, (client_response) => {
        console.log('response received');
        console.log(client_response.headers);
        process.exit();
    });
    client_request.end();
    console.log('request send');
});
