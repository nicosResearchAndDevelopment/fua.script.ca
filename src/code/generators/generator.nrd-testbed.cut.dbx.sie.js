const
    generators = exports,
    util       = require('../util.ca.js');

generators['nrd-testbed/ec/ids/cut/DBX/SIE']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/SIE/1'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/SIE/2'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/SIE/3'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/SIE/1']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/SIE/1/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/SIE/1/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/SIE/1/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/SIE/1/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'AT',
            organization: 'Siemens Energy Austria GmbH',
            commonName:   '*.siemens-energy.com'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/SIE/1/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/SIE/1/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'AT',
            organization: 'Siemens Energy Austria GmbH',
            commonName:   '*.siemens-energy.com'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/SIE/2']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/SIE/2/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/SIE/2/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/SIE/2/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/SIE/2/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'AT',
            organization: 'Siemens Energy Austria GmbH',
            commonName:   '*.siemens-energy.com'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/SIE/2/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/SIE/2/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'AT',
            organization: 'Siemens Energy Austria GmbH',
            commonName:   '*.siemens-energy.com'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/SIE/3']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/SIE/3/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/SIE/3/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/SIE/3/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/SIE/3/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'AT',
            organization: 'Siemens Energy Austria GmbH',
            commonName:   '*.siemens-energy.com'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/SIE/3/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/SIE/3/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'AT',
            organization: 'Siemens Energy Austria GmbH',
            commonName:   '*.siemens-energy.com'
        }
    });
};

Object.freeze(generators);
module.exports = generators;
