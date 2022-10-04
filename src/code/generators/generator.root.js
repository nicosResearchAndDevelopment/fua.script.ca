const
    generators = exports,
    util       = require('../util.ca.js');

generators['root/ca'] = async function ({agent, defaults}) {
    await agent.generateRootCertificate('root/ca', {
        subject: {
            ...defaults.subject,
            commonName: 'root_ca'
        }
    });
};

Object.freeze(generators);
module.exports = generators;
