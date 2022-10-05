const
    path    = require('path'),
    util    = require('./code/util.ca.js'),
    CAAgent = require('./code/agent.ca.js'),
    ca_app  = require('./app.ca.js');

(async function Main() {

    const
        param   = util.parseArgv(),
        caAgent = new CAAgent({
            cwd:     path.join(__dirname, '../resources'),
            verbose: !!(param.verbose)
        });

    await ca_app({
        agent:  caAgent,
        config: param
    });

    util.logDone();

})().catch(console.error);
