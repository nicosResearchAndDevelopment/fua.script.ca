const
    generators = exports,
    util       = require('../util.ca.js');

Object.assign(generators, require('./generator.nrd-testbed.cut.fiware.js'));
Object.assign(generators, require('./generator.nrd-testbed.cut.wnw.js'));
Object.assign(generators, require('./generator.nrd-testbed.cut.dbx.js'));

generators['nrd-testbed/ec/ids/cut']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/nrd_gbx-03'](param);
    await generators['nrd-testbed/ec/ids/cut/dsc'](param);
    await generators['nrd-testbed/ec/ids/cut/FIWARE'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX'](param);
};

generators['nrd-testbed/ec/ids/cut/nrd_gbx-03']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/nrd_gbx-03/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/nrd_gbx-03/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/nrd_gbx-03/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/nrd_gbx-03/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'ec', 'ids', 'cut', 'ec_ids_connector_nrd_gbx-03']
        }
    });
};

generators['nrd-testbed/ec/ids/cut/nrd_gbx-03/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/nrd_gbx-03/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'gbx.nicos-rd.com']
        }
    });
};

generators['nrd-testbed/ec/ids/cut/dsc']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/dsc/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/dsc/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/dsc/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/dsc/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'ec_ids_dsc_connector']
        }
    });
};

generators['nrd-testbed/ec/ids/cut/dsc/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/dsc/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'ids-dsc.nicos-rd.com']
        }
    });
};

Object.freeze(generators);
module.exports = generators;
