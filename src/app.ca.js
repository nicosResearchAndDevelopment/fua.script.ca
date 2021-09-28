/**
 * @param {import('./code/agent.ca.js').default} agent
 * @param {Object} config
 * @returns {Promise<void>}
 */

module.exports = async function ({agent, config}) {

    //
    // REM : do not use: await agent.generateRootCertificate('root/ca');
    //

    //region TEST
    let root;
    //region TEST tb
    if (true) {


        // REM : testbed 'tb'
        await agent.generateClientCertificate('nrd-testbed/tb/tls-server/server', 'root/ca');

        // REM : testsuite 'ts'
        await agent.generateClientCertificate('nrd-testbed/ts/tls-server/server', 'root/ca');

        //region TEST tb.ec
        //region TEST tb.ec.ids
        let cert_config = {};

        // REM : nrd-daps
        await agent.generateClientCertificate('nrd-testbed/ec/ids/nrd-daps/connector/client', 'root/ca');
        await agent.generateClientCertificate('nrd-testbed/ec/ids/nrd-daps/tls-server/server', 'root/ca');

        // REM : omejdn-daps
        await agent.generateClientCertificate('nrd-testbed/ec/ids/omejdn-daps/connector/client', 'root/ca');
        await agent.generateClientCertificate('nrd-testbed/ec/ids/omejdn-daps/tls-server/server', 'root/ca');

        // REM : Meta Data Broker
        await agent.generateClientCertificate('nrd-testbed/ec/ids/mdb/connector/client', 'root/ca');
        await agent.generateClientCertificate('nrd-testbed/ec/ids/mdb/tls-server/server', 'root/ca');

        // REM : ParIS
        await agent.generateClientCertificate('nrd-testbed/ec/ids/paris/connector/client', 'root/ca');
        await agent.generateClientCertificate('nrd-testbed/ec/ids/paris/tls-server/server', 'root/ca');

        // REM : Clearing House
        await agent.generateClientCertificate('nrd-testbed/ec/ids/ch/connector/client', 'root/ca');
        await agent.generateClientCertificate('nrd-testbed/ec/ids/ch/tls-server/server', 'root/ca');

        // REM : DTM
        await agent.generateClientCertificate('nrd-testbed/ec/ids/dtm/connector/client', 'root/ca');
        await agent.generateClientCertificate('nrd-testbed/ec/ids/dtm/tls-server/server', 'root/ca');

        // REM : ALICE
        await agent.generateClientCertificate('nrd-testbed/ec/ids/alice/connector/client', 'root/ca');
        await agent.generateClientCertificate('nrd-testbed/ec/ids/alice/tls-server/server', 'root/ca');

        // REM : BOB
        await agent.generateClientCertificate('nrd-testbed/ec/ids/bob/connector/client', 'root/ca');
        await agent.generateClientCertificate('nrd-testbed/ec/ids/bob/tls-server/server', 'root/ca');

        // REM : Data Space Connector
        await agent.generateClientCertificate('nrd-testbed/ec/ids/dsc/connector/client', 'root/ca');
        await agent.generateClientCertificate('nrd-testbed/ec/ids/dsc/tls-server/server', 'root/ca');

        //region TEST tb.ec.ids : applicant
        // REM : GAIAboX
        await agent.generateClientCertificate('nrd-testbed/ec/ids/applicant/gbx/connector/client', 'root/ca');
        await agent.generateClientCertificate('nrd-testbed/ec/ids/applicant/gbx/tls-server/server', 'root/ca');
        //endregion TEST tb.ec.ids : applicant

        //endregion TEST tb.ec.ids
        //endregion TEST tb.ec
        //endregion TEST tb
    } // if (shield TEST tb)
    //region TEST TEMP
    // REM : this is deletable!!!
    //await agent.generateClientCertificate('temp/client', 'root/ca');
    //endregion TEST TEMP

    //endregion TEST

}; // module.exports
