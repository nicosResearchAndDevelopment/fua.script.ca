/**
 * @param {import('./code/agent.ca.js').default} agent
 * @param {Object} config
 * @returns {Promise<void>}
 */

module.exports = async function ({agent, config}) {

    // NOTE: do not use: await agent.generateRootCertificate('root/ca');

    //region TEST
    //region TEST tb.ec.ids
    let cert_config = {};
    // await agent.generateClientCertificate('nrd-testbed/ec/ids/alice/client', 'root/ca', cert_config);
    // await agent.generateClientCertificate('nrd-testbed/ec/ids/alice/client', 'root/ca');
    // await agent.generateClientCertificate('nrd-testbed/ec/ids/bob/client', 'root/ca');

    // ALICE
    await agent.generateClientCertificate('nrd-testbed/ec/ids/alice/connector/client', 'root/ca');
    await agent.generateClientCertificate('nrd-testbed/ec/ids/alice/tls-server/server', 'root/ca');

    // BOB
    await agent.generateClientCertificate('nrd-testbed/ec/ids/bob/connector/client', 'root/ca');
    await agent.generateClientCertificate('nrd-testbed/ec/ids/bob/tls-server/server', 'root/ca');

    //region applicant
    //region applicant :: gbx-03
    await agent.generateClientCertificate('nrd-testbed/ec/ids/applicant/gbx-03/connector/client', 'root/ca');
    await agent.generateClientCertificate('nrd-testbed/ec/ids/applicant/gbx-03/tls-server/server', 'root/ca');
    //endregion applicant :: gbx-03
    //endregion applicant

    //endregion TEST tb.ec.ids
    //await agent.generateClientCertificate('temp/client', 'root/ca');
    //endregion TEST

    await agent.generateClientCertificate('nrd-testbed/ec/ids/applicant/gbx-03/tls-server/server', 'root/ca');

}; // module.exports
