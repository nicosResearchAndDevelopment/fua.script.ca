const
    path    = require('path'),
    CAAgent = require('../../src/code/agent.ca.js'),
    caAgent = new CAAgent({
        cwd:     path.join(__dirname, '..'),
        verbose: true
    });

// caAgent.generateSubCertificate('temp/ca', {
//     ca:      'root/ca',
//     subject: '/C=DE/ST=NRW/O=nicos Research & Development GmbH/CN=temp_ca'
// }).catch(console.error);

caAgent.generateClientCertificate('temp/server', {
    ca:      'temp/ca',
    subject: {
        C:  'DE',
        ST: 'NRW',
        O:  'nicos Research & Development GmbH',
        CN: 'temp_server'
    }
}).catch(console.error);

caAgent.generateClientCertificate('temp/client', {
    ca:      'temp/ca',
    subject: [{
        country:      'DE',
        state:        'NRW',
        organization: 'nicos Research & Development GmbH',
        commonName:   ['temp']
    }, {
        'Common-Name': 'client'
    }]
}).catch(console.error);
