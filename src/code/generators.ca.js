const
    generators = exports,
    util       = require('./util.ca.js');

Object.assign(generators, require('./generators/generator.develop-spe.js'));
Object.assign(generators, require('./generators/generator.nrd-testbed.js'));
Object.assign(generators, require('./generators/generator.nicos-rd.js'));

generators['root/ca'] = async function ({agent, config, defaults}) {
    await agent.generateRootCertificate('root/ca', {
        subject:    {
            ...defaults.subject,
            commonName: 'root_ca'
        },
        expiration: {
            years: 20
        }
    });
    await generators['develop-spe/ca']({agent, config, defaults});
    await generators['nrd-testbed/ca']({agent, config, defaults});
    await generators['nicos-rd/ca']({agent, config, defaults});
};

Object.freeze(generators);
module.exports = generators;
