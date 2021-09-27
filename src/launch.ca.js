const
    path        = require('path'),
    proc        = require('./code/proc.js'),
    CAAgent     = require('./code/agent.ca.js'),
    __resources = path.join(__dirname, '../resources'),
    ca_app      = require('./app.ca.js');

(async function Main() {

    const
        {param} = proc.parseArgv(),
        caAgent = new CAAgent(__resources);

    await ca_app({
        agent:  caAgent,
        config: {
            resources: __resources,
            ...param
        }
    });

})().catch(console.error);
