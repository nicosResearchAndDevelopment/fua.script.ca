const
    generators = exports,
    util       = require('./util.ca.js');

Object.assign(generators, require('./generators/generator.root.js'));
Object.assign(generators, require('./generators/generator.develop-spe.js'));
Object.assign(generators, require('./generators/generator.nrd-testbed.js'));

Object.freeze(generators);
module.exports = generators;
