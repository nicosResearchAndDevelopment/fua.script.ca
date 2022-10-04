const
    generators = exports,
    util       = require('../util.ca.js');

generators['develop-spe/test'] = async function (param) {
    await Promise.all([
        generators['develop-spe/test/ca'](param),
        generators['develop-spe/test/client'](param),
        generators['develop-spe/test/server'](param)
    ]);
};

generators['develop-spe/test/ca'] = async function ({agent, defaults}) {
    await agent.generateSubCertificate('develop-spe/test/ca', {
        ca:         'root/ca',
        subject:    {
            ...defaults.subject,
            CN: 'develop-spe-test-ca'
        },
        extensions: 'root_extension'
    });
};

generators['develop-spe/test/client'] = async function ({agent, defaults}) {
    await agent.generateClientCertificate('develop-spe/test/client', {
        ca:      'develop-spe/test/ca',
        subject: {
            ...defaults.subject,
            CN: ['develop-spe-test-client', 'localhost']
        }
    });
};

generators['develop-spe/test/server'] = async function ({agent, defaults}) {
    await agent.generateClientCertificate('develop-spe/test/server', {
        ca:      'develop-spe/test/ca',
        subject: {
            ...defaults.subject,
            CN: ['develop-spe-test-server', 'localhost']
        }
    });
};

Object.freeze(generators);
module.exports = generators;
