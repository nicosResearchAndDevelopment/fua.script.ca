const
    generators = exports,
    util       = require('../util.ca.js');

generators['nrd-testbed/ec/ids/cut/DBX/NOVA']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/1'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/2'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/3'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/4'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/5'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/6'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA-metadata']
    = async function ({agent, config, defaults}) {
    await agent.generateJavaScriptLoader('nrd-testbed/ec/ids/cut/DBX/NOVA/1/connector/client');
    await agent.generateJsonMetadata('nrd-testbed/ec/ids/cut/DBX/NOVA/1/connector/client');
    await agent.generateJsonMetadata('nrd-testbed/ec/ids/cut/DBX/NOVA/1/tls-server/server');
    await agent.generateJavaScriptLoader('nrd-testbed/ec/ids/cut/DBX/NOVA/2/connector/client');
    await agent.generateJsonMetadata('nrd-testbed/ec/ids/cut/DBX/NOVA/2/connector/client');
    await agent.generateJsonMetadata('nrd-testbed/ec/ids/cut/DBX/NOVA/2/tls-server/server');
    await agent.generateJavaScriptLoader('nrd-testbed/ec/ids/cut/DBX/NOVA/3/connector/client');
    await agent.generateJsonMetadata('nrd-testbed/ec/ids/cut/DBX/NOVA/3/connector/client');
    await agent.generateJsonMetadata('nrd-testbed/ec/ids/cut/DBX/NOVA/3/tls-server/server');
    await agent.generateJavaScriptLoader('nrd-testbed/ec/ids/cut/DBX/NOVA/4/connector/client');
    await agent.generateJsonMetadata('nrd-testbed/ec/ids/cut/DBX/NOVA/4/connector/client');
    await agent.generateJsonMetadata('nrd-testbed/ec/ids/cut/DBX/NOVA/4/tls-server/server');
    await agent.generateJavaScriptLoader('nrd-testbed/ec/ids/cut/DBX/NOVA/5/connector/client');
    await agent.generateJsonMetadata('nrd-testbed/ec/ids/cut/DBX/NOVA/5/connector/client');
    await agent.generateJsonMetadata('nrd-testbed/ec/ids/cut/DBX/NOVA/5/tls-server/server');
    await agent.generateJavaScriptLoader('nrd-testbed/ec/ids/cut/DBX/NOVA/6/connector/client');
    await agent.generateJsonMetadata('nrd-testbed/ec/ids/cut/DBX/NOVA/6/connector/client');
    await agent.generateJsonMetadata('nrd-testbed/ec/ids/cut/DBX/NOVA/6/tls-server/server');
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/1']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/1/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/1/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/1/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateCustomerCertificate('nrd-testbed/ec/ids/cut/DBX/NOVA/1/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'GR',
            organization: 'Nova',
            commonName:   '*.nova.gr'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/1/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateCustomerCertificate('nrd-testbed/ec/ids/cut/DBX/NOVA/1/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'GR',
            organization: 'Nova',
            commonName:   '*.nova.gr'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/2']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/2/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/2/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/2/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateCustomerCertificate('nrd-testbed/ec/ids/cut/DBX/NOVA/2/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'GR',
            organization: 'Nova',
            commonName:   '*.nova.gr'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/2/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateCustomerCertificate('nrd-testbed/ec/ids/cut/DBX/NOVA/2/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'GR',
            organization: 'Nova',
            commonName:   '*.nova.gr'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/3']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/3/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/3/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/3/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateCustomerCertificate('nrd-testbed/ec/ids/cut/DBX/NOVA/3/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'GR',
            organization: 'Nova',
            commonName:   '*.nova.gr'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/3/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateCustomerCertificate('nrd-testbed/ec/ids/cut/DBX/NOVA/3/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'GR',
            organization: 'Nova',
            commonName:   '*.nova.gr'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/4']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/4/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/4/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/4/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateCustomerCertificate('nrd-testbed/ec/ids/cut/DBX/NOVA/4/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'GR',
            organization: 'Nova',
            commonName:   '*.nova.gr'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/4/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateCustomerCertificate('nrd-testbed/ec/ids/cut/DBX/NOVA/4/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'GR',
            organization: 'Nova',
            commonName:   '*.nova.gr'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/5']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/5/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/5/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/5/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateCustomerCertificate('nrd-testbed/ec/ids/cut/DBX/NOVA/5/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'GR',
            organization: 'Nova',
            commonName:   '*.nova.gr'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/5/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateCustomerCertificate('nrd-testbed/ec/ids/cut/DBX/NOVA/5/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'GR',
            organization: 'Nova',
            commonName:   '*.nova.gr'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/6']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/6/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA/6/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/6/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateCustomerCertificate('nrd-testbed/ec/ids/cut/DBX/NOVA/6/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'GR',
            organization: 'Nova',
            commonName:   '*.nova.gr'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/NOVA/6/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateCustomerCertificate('nrd-testbed/ec/ids/cut/DBX/NOVA/6/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'GR',
            organization: 'Nova',
            commonName:   '*.nova.gr'
        }
    });
};

Object.freeze(generators);
module.exports = generators;
