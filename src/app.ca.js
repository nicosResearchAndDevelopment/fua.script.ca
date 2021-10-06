/**
 * @param {import('./code/agent.ca.js').default} agent
 * @param {Object} config
 * @returns {Promise<void>}
 */
module.exports = async function ({agent, config}) {

    // REM : generally do not re-generate the root_ca
    // await agent.generateRootCertificate('root/ca', {
    //     subject: {
    //         country:      'DE',
    //         state:        'NRW',
    //         locality:     'Muenster',
    //         organization: 'nicos Research & Development GmbH',
    //         commonName:   'root_ca'
    //     }
    // });

    //region TEST
    let root;
    //region TEST tb
    if (true) {

        const
            C  = 'DE',
            ST = 'NRW',
            L  = 'Muenster',
            O  = 'nicos Research & Development GmbH'
        ; // const

        if (false) {
            debugger;
            throw (new Error(``));
            // REM : testbed-ca
            await agent.generateSubCertificate('nrd-testbed/ca', {
                ca:      'root/ca',
                subject: {C, ST, L, O, CN: ['tb', 'tb_ca']}
            });
        } // if (shield)

        if (false) {
            debugger;
            throw (new Error(``));
            // REM : testbed 'tb'
            await agent.generateClientCertificate('nrd-testbed/tb/tls-server/server', {
                ca:      'nrd-testbed/ca',
                subject: {C, ST, L, O, CN: ['tb', 'tls_server']}
            });

            // REM : testsuite 'ts'
            await agent.generateClientCertificate('nrd-testbed/ts/tls-server/server', {
                ca:      'nrd-testbed/ca',
                subject: {C, ST, L, O, CN: ['ts', 'tls_server']}
            });
        } // if (shield=

        //region TEST tb.ec
        //region TEST tb.ec.ids

        let cert_config = {};

        if (false) {
            debugger;
            throw (new Error(``));
            // REM: participant ca
            await agent.generateSubCertificate('nrd-testbed/ec/ids/participant/ca', {
                ca:      'nrd-testbed/ca',
                subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_participant_ca']}
            });
            // REM : component ca
            await agent.generateSubCertificate('nrd-testbed/ec/ids/component/ca', {
                ca:      'nrd-testbed/ca',
                subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_component_ca']}
            });
        } // if (shield)

        // REM : nrd-daps
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/daps_nrd/connector/client', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_daps_nrd']} // REM : 'ec_ids_daps_nrd' = DAPS 'nrd' (nicos Research & Development GmbH)
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/daps_nrd/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_daps_nrd_tls-server']}
        });

        // REM : omejdn-daps
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/daps_fh_omejdn/connector/client', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_daps_fh_omejdn']} // REM : 'ec_ids_daps_fh_omejdn' = DAPS 'omejdn' (Fraunhofer, AISEC)
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/daps_fh_omejdn/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_daps_fh_omejdn_tls-server']}
        });

        // REM : Meta Data Broker
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/mdb_fh_mdb/connector/client', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_mdb_fh_mdb']} // REM : 'ec_ids_mdb_fh_mdb' = Meta Data Broker Fraunhofer
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/mdb_fh_mdb/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_mdb_fh_mdb_tls-server']}
        });

        // REM : ParIS
        // await agent.generateClientCertificate('nrd-testbed/ec/ids/paris/connector/client', {
        //     ca:      'nrd-testbed/ec/ids/component/ca',
        //     subject: {C, ST, O, CN: ['tb', 'ec_ids_paris_connector']}
        // });
        // await agent.generateClientCertificate('nrd-testbed/ec/ids/paris/tls-server/server', {
        //     ca:      'nrd-testbed/ec/ids/component/ca',
        //     subject: {C, ST, O, CN: ['tb', 'ec_ids_paris_tls-server']}
        // });

        // REM : Clearing House
        // await agent.generateClientCertificate('nrd-testbed/ec/ids/ch/connector/client', {
        //     ca:      'nrd-testbed/ec/ids/component/ca',
        //     subject: {C, ST, O, CN: ['tb', 'ec_ids_ch_connector']}
        // });
        // await agent.generateClientCertificate('nrd-testbed/ec/ids/ch/tls-server/server', {
        //     ca:      'nrd-testbed/ec/ids/component/ca',
        //     subject: {C, ST, O, CN: ['tb', 'ec_ids_ch_connector']}
        // });

        // REM : DTM
        // await agent.generateClientCertificate('nrd-testbed/ec/ids/dtm/connector/client', {
        //     ca:      'nrd-testbed/ec/ids/component/ca',
        //     subject: {C, ST, O, CN: ['tb', 'ec_ids_dtm_connector']}
        // });
        // await agent.generateClientCertificate('nrd-testbed/ec/ids/dtm/tls-server/server', {
        //     ca:      'nrd-testbed/ec/ids/component/ca',
        //     subject: {C, ST, O, CN: ['tb', 'ec_ids_dtm_tls-server']}
        // });

        // REM : ALICE
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/alice/connector/client', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_connector_alice']}
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/alice/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_connector_alice_tls-server']}
        });

        // REM : BOB
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/bob/connector/client', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_connector_bob']}
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/component/bob/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'ec_ids_connector_bob_tls-server']}
        });

        // REM : Data Space Connector
        // await agent.generateClientCertificate('nrd-testbed/ec/ids/dsc/connector/client', {
        //     ca:      'nrd-testbed/ec/ids/component/ca',
        //     subject: {C, ST, O, CN: ['tb', 'ec_ids_dsc_connector']}
        // });
        // await agent.generateClientCertificate('nrd-testbed/ec/ids/dsc/tls-server/server', {
        //     ca:      'nrd-testbed/ec/ids/component/ca',
        //     subject: {C, ST, O, CN: ['tb', 'ec_ids_dsc_tls-server']}
        // });

        //region TEST tb.ec.ids : cut (applicant)
        // REM : GAIAboX
        await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/nrd_gbx-03/connector/client', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'cut', 'ec_ids_connector_nrd_gbx-03']}
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/nrd_gbx-03/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, O, CN: ['tb', 'ec_ids_connector_nrd_gbx-03_tls-server']}
        });
        // REM : Data Space Connector (dsc)
        await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/fh_dsc/connector/client', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec', 'ids', 'cut', 'ec_ids_connector_fh_dsc']}
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/fh_dsc/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/component/ca',
            subject: {C, ST, O, CN: ['tb', 'ec_ids_fh_connector_dsc_tls-server']}
        });
        //endregion TEST tb.ec.ids : cut (applicant)

        //endregion TEST tb.ec.ids
        //endregion TEST tb.ec
        //endregion TEST tb
    } // if (shield TEST tb)

    //endregion TEST

}; // module.exports
