const
    server_conf = require('./test/server.js'),
    client_conf = require('./test/client.js'),
    https       = require('https'),
    PORT        = 8091;

https.createServer({
    key:                server_conf.key,
    cert:               server_conf.cert,
    ca:                 server_conf.ca,
    requestCert:        true,
    rejectUnauthorized: true
}, (server_request, server_response) => {
    console.log('request received');
    console.log(server_request.headers);
    server_response.end();
    console.log('response send');
}).listen(PORT, () => {
    const client_request = https.request('https://localhost:' + PORT, {
        key:                client_conf.key,
        cert:               client_conf.cert,
        ca:                 client_conf.ca,
        rejectUnauthorized: true
    }, (client_response) => {
        console.log('response received');
        console.log(client_response.headers);
        process.exit();
    });
    client_request.end();
    console.log('request send');
});
