const
    path        = require('path'),
    CAAgent     = require('../../src/code/agent.ca.js'),
    caAgent     = new CAAgent({
        cwd:     path.join(__dirname, '..'),
        verbose: false
    }),
    defaultSubj = {
        C:  'DE',
        ST: 'NRW',
        L:  'Muenster',
        O:  'nicos Research & Development GmbH'
    };

(async function Main() {

    await caAgent.generateSubCertificate('develop-spe/test/ca', {
        ca:         'root/ca',
        subject:    {
            ...defaultSubj,
            CN: 'develop-spe-test-ca'
        },
        extensions: 'root_extension'
    });

    await caAgent.generateClientCertificate('develop-spe/test/client', {
        ca:      'develop-spe/test/ca',
        subject: {
            ...defaultSubj,
            CN: ['develop-spe-test-client', 'localhost']
        }
    });

    await caAgent.generateClientCertificate('develop-spe/test/server', {
        ca:      'develop-spe/test/ca',
        subject: {
            ...defaultSubj,
            CN: ['develop-spe-test-server', 'localhost']
        }
    });

})().catch(err => console.error(err?.stack ?? err));
