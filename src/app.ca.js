/**
 * @param {import('./code/agent.ca.js').default} agent
 * @param {Object} config
 * @returns {Promise<void>}
 */
module.exports = async function ({agent, config}) {

    // REM : generally do not re-generate the root_ca
    await agent.generateRootCertificate('root/ca', {
        subject: {
            country:      'DE',
            state:        'NRW',
            locality:     'Muenster',
            organization: 'nicos Research & Development GmbH',
            commonName:   'root_ca'
        }
    });

    //region TEST
    let root;
    //region TEST tb
    if (true) {

        const C = 'DE', ST = 'NRW', L = 'Muenster', O = 'nicos Research & Development GmbH';

        // REM : testbed-ca
        await agent.generateSubCertificate('nrd-testbed/ca', {
            ca:      'root/ca',
            subject: {C, ST, L, O, CN: 'tb'}
        });

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

        //region TEST tb.ec
        //region TEST tb.ec.ids

        let cert_config = {};

        // REM: participants ca
        await agent.generateSubCertificate('nrd-testbed/ec/ids/participants/ca', {
            ca:      'nrd-testbed/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec_ids_participants_ca']}
        });

        // REM : components ca
        await agent.generateSubCertificate('nrd-testbed/ec/ids/components/ca', {
            ca:      'nrd-testbed/ca',
            subject: {C, ST, L, O, CN: ['tb', 'ec_ids_components_ca']}
        });

        // REM : nrd-daps
        await agent.generateClientCertificate('nrd-testbed/ec/ids/nrd-daps/connector/client', {
            ca:      'nrd-testbed/ec/ids/components/ca',
            subject: {C, ST, O, CN: ['tb', 'ec_ids_nrd-daps_connector']}
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/nrd-daps/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/components/ca',
            subject: {C, ST, O, CN: ['tb', 'ec_ids_nrd-daps_tls-server']}
        });

        // REM : omejdn-daps
        await agent.generateClientCertificate('nrd-testbed/ec/ids/omejdn-daps/connector/client', {
            ca:      'nrd-testbed/ec/ids/components/ca',
            subject: {C, ST, O: 'International Data Spaces e. V.', CN: ['tb', 'ec_ids_omejdn-daps_connector']}
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/omejdn-daps/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/components/ca',
            subject: {C, ST, O: 'International Data Spaces e. V.', CN: ['tb', 'ec_ids_omejdn-daps_tls-server']}
        });

        // REM : Meta Data Broker
        await agent.generateClientCertificate('nrd-testbed/ec/ids/mdb/connector/client', {
            ca:      'nrd-testbed/ec/ids/components/ca',
            subject: {C, ST, O: 'International Data Spaces e. V.', CN: ['tb', 'ec_ids_mdb_connector']}
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/mdb/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/components/ca',
            subject: {C, ST, O: 'International Data Spaces e. V.', CN: ['tb', 'ec_ids_mdb_tls-server']}
        });

        // REM : ParIS
        // await agent.generateClientCertificate('nrd-testbed/ec/ids/paris/connector/client', {
        //     ca:      'nrd-testbed/ec/ids/components/ca',
        //     subject: {C, ST, O, CN: ['tb', 'ec_ids_paris_connector']}
        // });
        // await agent.generateClientCertificate('nrd-testbed/ec/ids/paris/tls-server/server', {
        //     ca:      'nrd-testbed/ec/ids/components/ca',
        //     subject: {C, ST, O, CN: ['tb', 'ec_ids_paris_tls-server']}
        // });

        // REM : Clearing House
        // await agent.generateClientCertificate('nrd-testbed/ec/ids/ch/connector/client', {
        //     ca:      'nrd-testbed/ec/ids/components/ca',
        //     subject: {C, ST, O, CN: ['tb', 'ec_ids_ch_connector']}
        // });
        // await agent.generateClientCertificate('nrd-testbed/ec/ids/ch/tls-server/server', {
        //     ca:      'nrd-testbed/ec/ids/components/ca',
        //     subject: {C, ST, O, CN: ['tb', 'ec_ids_ch_connector']}
        // });

        // REM : DTM
        // await agent.generateClientCertificate('nrd-testbed/ec/ids/dtm/connector/client', {
        //     ca:      'nrd-testbed/ec/ids/components/ca',
        //     subject: {C, ST, O, CN: ['tb', 'ec_ids_dtm_connector']}
        // });
        // await agent.generateClientCertificate('nrd-testbed/ec/ids/dtm/tls-server/server', {
        //     ca:      'nrd-testbed/ec/ids/components/ca',
        //     subject: {C, ST, O, CN: ['tb', 'ec_ids_dtm_tls-server']}
        // });

        // REM : ALICE
        await agent.generateClientCertificate('nrd-testbed/ec/ids/alice/connector/client', {
            ca:      'nrd-testbed/ec/ids/components/ca',
            subject: {C, ST, O, CN: ['tb', 'ec_ids_alice_connector']}
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/alice/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/components/ca',
            subject: {C, ST, O, CN: ['tb', 'ec_ids_alice_tls-server']}
        });

        // REM : BOB
        await agent.generateClientCertificate('nrd-testbed/ec/ids/bob/connector/client', {
            ca:      'nrd-testbed/ec/ids/components/ca',
            subject: {C, ST, O, CN: ['tb', 'ec_ids_bob_connector']}
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/bob/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/components/ca',
            subject: {C, ST, O, CN: ['tb', 'ec_ids_bob_tls-server']}
        });

        // REM : Data Space Connector
        // await agent.generateClientCertificate('nrd-testbed/ec/ids/dsc/connector/client', {
        //     ca:      'nrd-testbed/ec/ids/components/ca',
        //     subject: {C, ST, O, CN: ['tb', 'ec_ids_dsc_connector']}
        // });
        // await agent.generateClientCertificate('nrd-testbed/ec/ids/dsc/tls-server/server', {
        //     ca:      'nrd-testbed/ec/ids/components/ca',
        //     subject: {C, ST, O, CN: ['tb', 'ec_ids_dsc_tls-server']}
        // });

        //region TEST tb.ec.ids : applicant
        // REM : GAIAboX
        await agent.generateClientCertificate('nrd-testbed/ec/ids/applicant/gbx/connector/client', {
            ca:      'nrd-testbed/ec/ids/participant/ca',
            subject: {C, ST, O, CN: ['tb', 'ec_ids_gbx-03_connector']}
        });
        await agent.generateClientCertificate('nrd-testbed/ec/ids/applicant/gbx/tls-server/server', {
            ca:      'nrd-testbed/ec/ids/participant/ca',
            subject: {C, ST, O, CN: ['tb', 'ec_ids_gbx-03_tls-server']}
        });
        //endregion TEST tb.ec.ids : applicant

        //endregion TEST tb.ec.ids
        //endregion TEST tb.ec
        //endregion TEST tb
    } // if (shield TEST tb)

    //endregion TEST

}; // module.exports
