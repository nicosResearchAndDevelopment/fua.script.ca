const
    _util      = require('@fua/core.util'),
    path       = require('path'),
    fs         = require('fs/promises'),
    crypto     = require('crypto'),
    subprocess = require('@fua/module.subprocess'),
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

util.createSha256Hash = function (content, inputEncoding = 'utf8', outputEncoding = 'base64') {
    const hash = crypto.createHash('sha256');
    hash.update(content, inputEncoding);
    return hash.digest(outputEncoding);
};

util.normalizeCertificate = function (certificate) {
    return certificate.split('\n')
        .filter(line => !line.includes('-----'))
        .map(line => line.trim())
        .join('');
};

util.createCertificateSha256Fingerprint = function (certificate) {
    const normalized = util.normalizeCertificate(certificate);
    return util.createSha256Hash(normalized, 'base64', 'hex');
};

module.exports = util;
