/**
 * @param {import('./code/agent.ca.js').default} agent
 * @param {Object} config
 * @returns {Promise<void>}
 */
module.exports = async function ({agent, config}) {

    // NOTE: do not use: await agent.generateRootCertificate('root/ca');

    await agent.generateClientCertificate('temp/client', 'root/ca');

    // await agent.generateClientCertificate('nrd-testbed/ec/ids/alice/client', 'root/ca');
    // await agent.generateClientCertificate('nrd-testbed/ec/ids/bob/client', 'root/ca');

}; // module.exports
