const
    path    = require('path'),
    CAAgent = require('../../src/code/agent.ca.js'),
    caAgent = new CAAgent({
        cwd:     path.join(__dirname, '..'),
        verbose: true
    });

// caAgent.generateClientCertificate('develop-spe/test/client', {ca: 'root/ca'}).catch(console.error);
// caAgent.generateClientCertificate('develop-spe/test/server', {ca: 'root/ca'}).catch(console.error);
