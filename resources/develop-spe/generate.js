const
    path    = require('path'),
    CAAgent = require('../../src/code/agent.ca.js'),
    caAgent = new CAAgent({
        cwd:     path.join(__dirname, '..'),
        verbose: true
    });

// caAgent.generateClientCertificate('develop-spe/test/client', 'root/ca').catch(console.error);
