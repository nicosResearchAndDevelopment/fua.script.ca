const
    util       = require('./code/util.ca.js'),
    generators = require('./code/generators.ca.js');

/**
 * @param {import('./code/agent.ca.js').default} agent
 * @param {Object} config
 * @returns {Promise<void>}
 */
module.exports = async function ({agent, config}) {

    const defaults = Object.freeze({
        subject: Object.freeze({
            C:  'DE',
            ST: 'NRW',
            L:  'Muenster',
            O:  'nicos Research & Development GmbH'
        })
    });

    for (let target of util.toArray(config.generate)) {
        const generator = generators[target];
        if (util.isFunction(generator)) {
            util.logWarning('generate ' + target);
            try {
                await generator({agent, config, defaults});
            } catch (err) {
                util.logError(err);
            }
        } else {
            util.logWarning('missing ' + target);
        }
    }

}; // module.exports
