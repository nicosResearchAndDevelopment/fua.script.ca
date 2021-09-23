/**
 * @param {import('./code/agent.ca.js').default} agent
 * @param {Object} config
 * @returns {Promise<void>}
 */
module.exports = async function ({agent, config}) {

    // TODO like jörg said
    // TODO folder structure
    // TODO configurable
    // TODO re-runnable
    // TODO launch from same file

    // await agent.generateRootCert();
    // await agent.generateClientCert();
    console.log(await agent.parseCert());

}; // module.exports
