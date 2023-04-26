const
    generators = exports,
    util       = require('../util.ca.js');

generators['nicos-rd']
    = async function (param) {
    await generators['nicos-rd/www'](param);
    await generators['nicos-rd/tb'](param);
};

generators['nicos-rd/ca']
    = async function ({agent, config, defaults}) {
    await agent.generateSubCertificate('nicos-rd/ca', {
        ca:         defaults.ca,
        subject:    {
            ...defaults.subject,
            CN: ['nicos-rd']
        },
        extensions: 'root_extension',
        expiration: {
            years: 10
        }
    });
};

generators['nicos-rd/www']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nicos-rd/www/server', {
        ca:      'nicos-rd/ca',
        subject: {
            ...defaults.subject,
            CN: '*.nicos-rd.com'
        }
    });
};

generators['nicos-rd/tb']
    = async function (param) {
    await generators['nicos-rd/tb/daps'](param);
};

generators['nicos-rd/tb/daps']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nicos-rd/tb/daps/server', {
        ca:      'nicos-rd/ca',
        subject: {
            ...defaults.subject,
            CN: 'daps.tb.nicos-rd.com'
        }
    });
};

Object.freeze(generators);
module.exports = generators;
