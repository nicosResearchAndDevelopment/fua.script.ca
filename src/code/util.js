const
    _util      = require('@nrd/fua.core.util'),
    path       = require('path'),
    fs         = require('fs/promises'),
    subprocess = require('@nrd/fua.module.subprocess'),
    util       = exports = module.exports = {
        ..._util,
        assert: _util.Assert('nrd-ca')
    };

util.parseArgv = subprocess.parseArgv;

/**
 * @param {string} input
 * @param {string} base
 * @returns {string}
 */
util.resolvePath = function (input, base) {
    if (path.isAbsolute(input)) return path.normalize(input);
    else return path.join(base, input);
}; // resolvePath

util.touchFolder = async function (folder) {
    await fs.mkdir(folder, {recursive: true});
}; // touchFolder

util.touchFile = async function (file) {
    try {
        const now = new Date();
        await fs.utimes(file, now, now);
    } catch (err) {
        if (err.code !== 'ENOENT') throw err;
        await fs.writeFile(file, '');
    }
}; // touchFile

module.exports = util;
