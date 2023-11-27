const
    generators = exports,
    util       = require('../util.ca.js');

generators['nrd-testbed/ec/ids/cut/FIWARE']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/FIWARE/dev'](param);
    await generators['nrd-testbed/ec/ids/cut/FIWARE/car-kim'](param);
    await generators['nrd-testbed/ec/ids/cut/FIWARE/platform-kim'](param);
};

generators['nrd-testbed/ec/ids/cut/FIWARE/dev']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/FIWARE/dev/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/FIWARE/dev/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/FIWARE/dev/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/FIWARE/dev/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.fiware.dev'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/FIWARE/dev/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/FIWARE/dev/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.fiware.dev'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/FIWARE/car-kim']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/FIWARE/car-kim/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/FIWARE/car-kim/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/FIWARE/car-kim/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/FIWARE/car-kim/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.car-kim.fiware-dataspace-connector.org'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/FIWARE/car-kim/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/FIWARE/car-kim/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.car-kim.fiware-dataspace-connector.org'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/FIWARE/platform-kim']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/FIWARE/platform-kim/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/FIWARE/platform-kim/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/FIWARE/platform-kim/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/FIWARE/platform-kim/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.platform-kim.fiware-dataspace-connector.org'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/FIWARE/platform-kim/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/FIWARE/platform-kim/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.platform-kim.fiware-dataspace-connector.org'
        }
    });
};

Object.freeze(generators);
module.exports = generators;
