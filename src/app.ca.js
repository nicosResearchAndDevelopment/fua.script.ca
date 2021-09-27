const
    path = require('path');

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
    // TODO other arguments for agent constructor
    // TODO runs preconfigured for the agent

    // await agent.generateRootCertificate(
    //     path.join(config.resources, 'root/ca')
    // );

    await agent.generateClientCertificate('./temp/client', './root/ca');

}; // module.exports
