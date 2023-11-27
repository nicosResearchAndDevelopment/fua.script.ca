const
    generators = exports,
    util       = require('../util.ca.js');

generators['nrd-testbed/ec/ids/cut/WNW']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/1'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/2'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/3'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/1']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/1/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/1/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/1/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/FIT/1/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'FIT',
            common_name:         '*.fit.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/1/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/FIT/1/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'FIT',
            common_name:         '*.fit.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/2']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/2/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/2/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/2/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/FIT/2/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'FIT',
            common_name:         '*.fit.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/2/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/FIT/2/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'FIT',
            common_name:         '*.fit.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/3']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/3/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/3/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/3/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/FIT/3/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'FIT',
            common_name:         '*.fit.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/3/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/FIT/3/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'FIT',
            common_name:         '*.fit.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/1'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/2'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/3'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/1']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/1/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/1/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/1/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/IMW/1/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'IMW',
            common_name:         '*.imw.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/1/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/IMW/1/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'IMW',
            common_name:         '*.imw.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/2']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/2/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/2/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/2/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/IMW/2/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'IMW',
            common_name:         '*.imw.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/2/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/IMW/2/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'IMW',
            common_name:         '*.imw.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/3']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/3/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/3/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/3/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/IMW/3/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'IMW',
            common_name:         '*.imw.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/3/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/IMW/3/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'IMW',
            common_name:         '*.imw.fraunhofer.de'
        }
    });
};

Object.freeze(generators);
module.exports = generators;
