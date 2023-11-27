const
    generators = exports,
    util       = require('../util.ca.js');

Object.assign(generators, require('./generator.nrd-testbed.cut.js'));

generators['nrd-testbed']
    = async function (param) {
    await generators['nrd-testbed/tb'](param);
    await generators['nrd-testbed/ts'](param);
    await generators['nrd-testbed/ec'](param);
};

generators['nrd-testbed/ca']
    = async function ({agent, config, defaults}) {
    await agent.generateSubCertificate('nrd-testbed/ca', {
        ca:         defaults.ca,
        subject:    {
            ...defaults.subject,
            CN: ['tb', 'tb_ca']
        },
        extensions: 'root_extension',
        expiration: {
            years: 10
        }
    });
    await generators['nrd-testbed/ec/ids/participant/ca']({agent, config, defaults});
    await generators['nrd-testbed/ec/ids/component/ca']({agent, config, defaults});
};

generators['nrd-testbed/tb']
    = async function (param) {
    await generators['nrd-testbed/tb/tls-server/server'](param);
};

generators['nrd-testbed/tb/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/tb/tls-server/server', {
        ca:      'nrd-testbed/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'testbed.nicos-rd.com']
        }
    });
};

generators['nrd-testbed/ts']
    = async function (param) {
    await generators['nrd-testbed/ts/tls-server/server'](param);
};

generators['nrd-testbed/ts/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ts/tls-server/server', {
        ca:      'nrd-testbed/ca',
        subject: {
            ...defaults.subject,
            CN: ['ts', 'testsuite.nicos-rd.com']
        }
    });
};

generators['nrd-testbed/ec']
    = async function (param) {
    await generators['nrd-testbed/ec/ids'](param);
};

generators['nrd-testbed/ec/ids']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/participant'](param);
    await generators['nrd-testbed/ec/ids/component'](param);
    await generators['nrd-testbed/ec/ids/cut'](param);
};

generators['nrd-testbed/ec/ids/ca']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/participant/ca'](param);
    await generators['nrd-testbed/ec/ids/component/ca'](param);
};

generators['nrd-testbed/ec/ids/participant/ca']
    = async function ({agent, config, defaults}) {
    await agent.generateSubCertificate('nrd-testbed/ec/ids/participant/ca', {
        ca:         'nrd-testbed/ca',
        subject:    {
            ...defaults.subject,
            CN: ['tb', 'ec', 'ids', 'ec_ids_participant_ca']
        },
        extensions: 'root_extension',
        expiration: {
            years: 10
        }
    });
};

generators['nrd-testbed/ec/ids/participant']
    = async function (param) {
    // currently no participant;
};

generators['nrd-testbed/ec/ids/component/ca']
    = async function ({agent, config, defaults}) {
    await agent.generateSubCertificate('nrd-testbed/ec/ids/component/ca', {
        ca:         'nrd-testbed/ca',
        subject:    {
            ...defaults.subject,
            CN: ['tb', 'ec', 'ids', 'ec_ids_component_ca']
        },
        extensions: 'root_extension',
        expiration: {
            years: 10
        }
    });
};

generators['nrd-testbed/ec/ids/component']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/component/daps_nrd'](param);
    await generators['nrd-testbed/ec/ids/component/daps_fh_omejdn'](param);
    await generators['nrd-testbed/ec/ids/component/mdb_fh_mdb'](param);
    await generators['nrd-testbed/ec/ids/paris'](param);
    await generators['nrd-testbed/ec/ids/ch'](param);
    await generators['nrd-testbed/ec/ids/dtm'](param);
    await generators['nrd-testbed/ec/ids/component/alice'](param);
    await generators['nrd-testbed/ec/ids/component/bob'](param);
};

generators['nrd-testbed/ec/ids/component/daps_nrd']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/component/daps_nrd/connector/client'](param);
    await generators['nrd-testbed/ec/ids/component/daps_nrd/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/component/daps_nrd/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/component/daps_nrd/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            // REM : 'ec_ids_daps_nrd' = DAPS 'nrd' (nicos Research & Development GmbH)
            CN: ['tb', 'ec', 'ids', 'ec_ids_daps_nrd']
        }
    });
};

generators['nrd-testbed/ec/ids/component/daps_nrd/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/component/daps_nrd/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'ec', 'ids', 'nrd-daps.nicos-rd.com']
        }

    });
};

generators['nrd-testbed/ec/ids/component/daps_fh_omejdn']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/component/daps_fh_omejdn/connector/client'](param);
    await generators['nrd-testbed/ec/ids/component/daps_fh_omejdn/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/component/daps_fh_omejdn/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/component/daps_fh_omejdn/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            // REM : 'ec_ids_daps_fh_omejdn' = DAPS 'omejdn' (Fraunhofer, AISEC)
            CN: ['tb', 'ec', 'ids', 'ec_ids_daps_fh_omejdn']
        }
    });
};

generators['nrd-testbed/ec/ids/component/daps_fh_omejdn/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/component/daps_fh_omejdn/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'ec', 'ids', 'omejdn-daps.nicos-rd.com']
        }
    });
};

generators['nrd-testbed/ec/ids/component/mdb_fh_mdb']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/component/mdb_fh_mdb/connector/client'](param);
    await generators['nrd-testbed/ec/ids/component/mdb_fh_mdb/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/component/mdb_fh_mdb/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/component/mdb_fh_mdb/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            // REM : 'ec_ids_mdb_fh_mdb' = Meta Data Broker Fraunhofer
            CN: ['tb', 'ec', 'ids', 'ec_ids_mdb_fh_mdb']
        }
    });
};

generators['nrd-testbed/ec/ids/component/mdb_fh_mdb/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/component/mdb_fh_mdb/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'ec', 'ids', 'mdb-fh.nicos-rd.com']
        }
    });
};

generators['nrd-testbed/ec/ids/paris']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/paris/connector/client'](param);
    await generators['nrd-testbed/ec/ids/paris/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/paris/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/paris/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'ec_ids_paris_connector']
        }
    });
};

generators['nrd-testbed/ec/ids/paris/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/paris/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'paris-fh.nicos-rd.com']
        }
    });
};

generators['nrd-testbed/ec/ids/ch']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/ch/connector/client'](param);
    await generators['nrd-testbed/ec/ids/ch/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/ch/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/ch/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'ec_ids_ch_connector']
        }
    });
};

generators['nrd-testbed/ec/ids/ch/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/ch/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'nrd-ch.nicos-rd.com']
        }
    });
};

generators['nrd-testbed/ec/ids/dtm']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/dtm/connector/client'](param);
    await generators['nrd-testbed/ec/ids/dtm/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/dtm/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/dtm/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'ec_ids_dtm_connector']
        }
    });
};

generators['nrd-testbed/ec/ids/dtm/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/dtm/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'nrd-dtm.nicos-rd.com']
        }
    });
};

generators['nrd-testbed/ec/ids/component/alice']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/component/alice/connector/client'](param);
    await generators['nrd-testbed/ec/ids/component/alice/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/component/alice/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/component/alice/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'ec', 'ids', 'ec_ids_connector_alice']
        }
    });
};

generators['nrd-testbed/ec/ids/component/alice/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/component/alice/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'ec', 'ids', 'alice.nicos-rd.com']
        }
    });
};

generators['nrd-testbed/ec/ids/component/bob']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/component/bob/connector/client'](param);
    await generators['nrd-testbed/ec/ids/component/bob/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/component/bob/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/component/bob/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'ec', 'ids', 'ec_ids_connector_bob']
        }
    });
};

generators['nrd-testbed/ec/ids/component/bob/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/component/bob/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'ec', 'ids', 'bob.nicos-rd.com']
        }
    });
};

Object.freeze(generators);
module.exports = generators;
