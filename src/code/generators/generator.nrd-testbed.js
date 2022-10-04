const
    generators = exports,
    util       = require('../util.ca.js');

generators['nrd-testbed'] = async function ({agent, config, defaults}) {

    // TODO

    if (false) {

        const
            C  = 'DE',
            ST = 'NRW',
            L  = 'Muenster',
            O  = 'nicos Research & Development GmbH'
        ; // const

        if (true) {
            debugger;
            //throw (new Error(``));
            // REM : testbed-ca
            await agent.generateSubCertificate('nrd-testbed/ca', {
                ca:         'root/ca',
                subject:    {C, ST, L, O, CN: ['tb', 'tb_ca']},
                extensions: "root_extension"
            });
        } // if (shield)

        if (true) {
            debugger;
            //throw (new Error(``));
            // REM : testbed 'tb'
            await agent.generateClientCertificate('nrd-testbed/tb/tls-server/server', {
                ca:      'nrd-testbed/ca',
                subject: {C, ST, L, O, CN: ['tb', 'testbed.nicos-rd.com']}
            });

            // REM : testsuite 'ts'
            await agent.generateClientCertificate('nrd-testbed/ts/tls-server/server', {
                ca:      'nrd-testbed/ca',
                subject: {C, ST, L, O, CN: ['ts', 'testsuite.nicos-rd.com']}
            });
        } // if (shield)

        //region TEST tb.ec
        //region TEST tb.ec.ids

        let cert_config = {};

        if (true) {
            debugger;
            //throw (new Error(``));
            // REM: participant ca
            await agent.generateSubCertificate('nrd-testbed/ec/ids/participant/ca', {
                ca:         'nrd-testbed/ca',
                subject:    {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_participant_ca']},
                extensions: "root_extension"
            });
            // REM : component ca
            await agent.generateSubCertificate('nrd-testbed/ec/ids/component/ca', {
                ca:         'nrd-testbed/ca',
                subject:    {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_component_ca']},
                extensions: "root_extension"
            });
        } // if (shield)

        // REM : nrd-daps
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/daps_nrd/connector/client', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_daps_nrd']} // REM : 'ec_ids_daps_nrd' = DAPS 'nrd' (nicos Research & Development GmbH)
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/daps_nrd/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'nrd-daps.nicos-rd.com']}
        });

        // REM : omejdn-daps
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/daps_fh_omejdn/connector/client', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_daps_fh_omejdn']} // REM : 'ec_ids_daps_fh_omejdn' = DAPS 'omejdn' (Fraunhofer, AISEC)
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/daps_fh_omejdn/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'omejdn-daps.nicos-rd.com']}
        });

        // REM : Meta Data Broker
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/mdb_fh_mdb/connector/client', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_mdb_fh_mdb']} // REM : 'ec_ids_mdb_fh_mdb' = Meta Data Broker Fraunhofer
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/mdb_fh_mdb/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'mdb-fh.nicos-rd.com']}
        });

        // REM : ParIS
        await agent.generateClientCertificate('nrd-testbed/ec/ids/paris/connector/client', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, O, CN: ['tb', 'ec_ids_paris_connector']}
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/paris/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, O, CN: ['tb', 'paris-fh.nicos-rd.com']}
        });

        // REM : Clearing House
        await agent.generateClientCertificate('nrd-testbed/ec/ids/ch/connector/client', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, O, CN: ['tb', 'ec_ids_ch_connector']}
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/ch/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, O, CN: ['tb', 'nrd-ch.nicos-rd.com']}
        });

        // REM : DTM
        await agent.generateClientCertificate('nrd-testbed/ec/ids/dtm/connector/client', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, O, CN: ['tb', 'ec_ids_dtm_connector']}
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/dtm/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, O, CN: ['tb', 'nrd-dtm.nicos-rd.com']}
        });

        // REM : ALICE
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/alice/connector/client', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_connector_alice']}
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/alice/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'alice.nicos-rd.com']}
        });

        // REM : BOB
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/bob/connector/client', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_connector_bob']}
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/bob/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'bob.nicos-rd.com']}
        });

        //region TEST tb.ec.ids : cut (applicant)

        // REM : GAIAboX
        await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/nrd_gbx-03/connector/client', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'cut', 'ec_ids_connector_nrd_gbx-03']}
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/nrd_gbx-03/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, O, CN: ['tb', 'gbx.nicos-rd.com']}
        });

        // REM : Data Space Connector
        await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/dsc/connector/client', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, O, CN: ['tb', 'ec_ids_dsc_connector']}
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/dsc/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, O, CN: ['tb', 'ids-dsc.nicos-rd.com']}
        });

        //endregion TEST tb.ec.ids : cut (applicant)

        //endregion TEST tb.ec.ids
        //endregion TEST tb.ec
        //endregion TEST tb
    }

};

Object.freeze(generators);
module.exports = generators;
