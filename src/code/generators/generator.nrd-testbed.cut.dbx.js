const
    generators = exports,
    util       = require('../util.ca.js');

Object.assign(generators, require('./generator.nrd-testbed.cut.dbx.swc.js'));
Object.assign(generators, require('./generator.nrd-testbed.cut.dbx.sie.js'));
Object.assign(generators, require('./generator.nrd-testbed.cut.dbx.nova.js'));
Object.assign(generators, require('./generator.nrd-testbed.cut.dbx.dum.js'));

generators['nrd-testbed/ec/ids/cut/DBX']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/SWC'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/SIE'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/NOVA'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/DUM'](param);
};

Object.freeze(generators);
module.exports = generators;
