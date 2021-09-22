const
    path        = require('path'),
    proc        = require('./code/proc.js'),
    CAAgent     = require('./code/agent.ca.js'),
    __resources = path.join(__dirname, '../resources');

(async function Main() {

    const
        {param} = proc.parseArgv(),
        caAgent = new CAAgent();

    await caAgent.generateRootCA();

})().catch(console.error);
