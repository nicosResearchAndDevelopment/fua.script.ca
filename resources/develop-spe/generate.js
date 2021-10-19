const
    path    = require('path'),
    CAAgent = require('../../src/code/agent.ca.js'),
    caAgent = new CAAgent({
        cwd:     path.join(__dirname, '..'),
        verbose: false
    });

// caAgent.generateSubCertificate('develop-spe/test/ca', {ca: 'root/ca'}).catch(console.error);
// caAgent.generateClientCertificate('develop-spe/test/client', {ca: 'develop-spe/test/ca'}).catch(console.error);
// caAgent.generateClientCertificate('develop-spe/test/server', {ca: 'develop-spe/test/ca'}).catch(console.error);
