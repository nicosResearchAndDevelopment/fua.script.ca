const
    CA         = exports,
    identifier = '@fua/script.ca',
    assert     = require('@fua/core.assert');

assert(!global[identifier], 'unable to load a second uncached version of the singleton ' + identifier);
Object.defineProperty(global, identifier, {value: CA, configurable: false, writable: false, enumerable: false});

const
    _CA         = Object.create(null),
    DN          = require('./dn.js'),
    path        = require('path'),
    crypto      = require('crypto'),
    fs          = require('fs/promises'),
    is          = require('@fua/core.is'),
    ts          = require('@fua/core.ts'),
    tty         = require('@fua/core.tty'),
    subprocess  = require('@fua/module.subprocess'),
    markdown    = require('@fua/module.markdown'),
    processArgs = subprocess.parseArgv(process.argv);

_CA.outputDir = path.join(__dirname, '../data');

_CA.openSSL = subprocess.ExecutionProcess('openssl', {
    cwd:      _CA.outputDir,
    verbose:  !!processArgs.verbose,
    encoding: 'utf-8'
});

_CA.keyTool = subprocess.ExecutionProcess('keytool', {
    cwd:      _CA.outputDir,
    verbose:  !!processArgs.verbose,
    encoding: 'utf-8'
});

_CA.git = subprocess.ExecutionProcess('git', {
    cwd:      _CA.outputDir,
    verbose:  !!processArgs.verbose,
    encoding: 'utf-8'
});

_CA.extentions = Object.freeze({
    privateKey:         '.key',
    publicKey:          '.pub',
    certificate:        '.cert',
    certificateText:    '.txt',
    certificateArchive: '.p12',
    keyStore:           '.jks',
    signingRequest:     '.csr',
    certificateConfig:  '.conf',
    caBundle:           '.ca',
    caSerial:           '.srl',
    jsonMetadata:       '.json',
    jsLoader:           '.js',
    readmeInfos:        '.md'
});

/**
 * @param {string} input
 * @param {string} [base=_CA.outputDir ]
 * @returns {string}
 */
_CA.getOutputPath = function (input, base) {
    return path.isAbsolute(input)
        ? path.normalize(input)
        : path.join(base || _CA.outputDir, input);
};

_CA.touchFolder = async function (folder) {
    await fs.mkdir(folder, {recursive: true});
};

_CA.touchFile = async function (file) {
    try {
        const now = new Date();
        await fs.utimes(file, now, now);
    } catch (err) {
        if (err.code !== 'ENOENT') throw err;
        await fs.writeFile(file, '');
        await _CA.git('add', file);
    }
};

/**
 * @param {number | string | Record<string, number>} exp
 * @returns {number}
 */
_CA.calculateExpirationDays = function (exp) {
    const msDuration = ts.duration(exp);
    assert(is.number.float.finite(msDuration) && msDuration > 0, 'expected to be a positive finite number');
    return Math.floor(msDuration / 86400000) || 1;
};

/**
 * @param {string} content
 * @param {BufferEncoding} [inputEncoding='utf8']
 * @param {BufferEncoding} [outputEncoding='base64']
 * @returns {string}
 */
_CA.createSha256Hash = function (content, inputEncoding = 'utf8', outputEncoding = 'base64') {
    const hash = crypto.createHash('sha256');
    hash.update(content, inputEncoding);
    return hash.digest(outputEncoding);
};

/**
 * @param {string} certificate
 * @returns {string}
 */
_CA.normalizeCertificate = function (certificate) {
    return certificate.split('\n')
        .filter(line => !line.includes('-----'))
        .map(line => line.trim())
        .join('');
};

/**
 * @param {string} certificate
 * @returns {string}
 */
_CA.createCertificateSha256Fingerprint = function (certificate) {
    const normalized = _CA.normalizeCertificate(certificate);
    return _CA.createSha256Hash(normalized, 'base64', 'hex');
};

Object.defineProperties(CA, {
    verbose: {
        enumerable: true,
        get:        () => _CA.openSSL.verbose,
        set:        (value) => _CA.openSSL.verbose = value
    }
})

/**
 * @param {string} file
 * @param {Record} options
 * @returns {Promise<void>}
 */
CA.generatePrivateKey = async function (file, options = {}) {
    assert.string(file);
    assert.object(options);
    await _CA.openSSL('genrsa', {
        out: file + _CA.extentions.privateKey
    }, 4096);
    await _CA.git('add', file + _CA.extentions.privateKey);
};

/**
 * @param {string} file
 * @param {Record} options
 * @returns {Promise<void>}
 */
CA.generatePublicKey = async function (file, options = {}) {
    assert.string(file);
    assert.object(options);
    await _CA.openSSL('rsa', {
        pubout: true,
        in:     file + _CA.extentions.privateKey,
        out:    file + _CA.extentions.publicKey
    });
    await _CA.git('add', file + _CA.extentions.publicKey);
};

/**
 * @param {string} file
 * @param {Record} options
 * @returns {Promise<void>}
 */
CA.generateSelfSignedCertificate = async function (file, options = {}) {
    assert.string(file);
    assert.object(options);
    await _CA.openSSL('req', {
        x509:  true,
        new:   true,
        nodes: true,
        batch: !options.subject,
        subj:  options.subject ? DN.serialize(options.subject) : false,
        key:   file + _CA.extentions.privateKey,
        days:  options.expiration ? _CA.calculateExpirationDays(options.expiration) : 825,
        out:   file + _CA.extentions.certificate
    });
    await _CA.git('add', file + _CA.extentions.certificate);
};

/**
 * @param {string} file
 * @param {Record} options
 * @returns {Promise<void>}
 */
CA.generateCertificateSigningRequest = async function (file, options = {}) {
    assert.string(file);
    assert.object(options);
    await _CA.openSSL('req', {
        new:   true,
        batch: !options.subject,
        subj:  options.subject ? DN.serialize(options.subject) : false,
        key:   file + _CA.extentions.privateKey,
        out:   file + _CA.extentions.signingRequest
    });
    await _CA.git('add', file + _CA.extentions.signingRequest);
};

/**
 * @param {string} file
 * @param {Record} options
 * @returns {Promise<void>}
 */
CA.generateSignedCertificate = async function (file, options = {}) {
    assert.string(file);
    assert.object(options, {ca: is.string});
    await _CA.openSSL('x509', {
        req:            true,
        CAcreateserial: true,
        CAserial:       options.ca + _CA.extentions.caSerial,
        CA:             options.ca + _CA.extentions.certificate,
        CAkey:          options.ca + _CA.extentions.privateKey,
        days:           options.expiration ? _CA.calculateExpirationDays(options.expiration) : 398,
        in:             file + _CA.extentions.signingRequest,
        out:            file + _CA.extentions.certificate,
        extfile:        options.ca + _CA.extentions.certificateConfig,
        extensions:     options.extensions || 'default'
    });
    await _CA.git('add', options.ca + _CA.extentions.caSerial);
    await _CA.git('add', file + _CA.extentions.certificate);
};

/**
 * @param {string} file
 * @param {Record} options
 * @returns {Promise<void>}
 */
CA.generateCertificateArchive = async function (file, options = {}) {
    assert.string(file);
    assert.object(options, {passPhrase: is.string});
    await _CA.openSSL('pkcs12', {
        export:   true,
        in:       file + _CA.extentions.certificate,
        inkey:    file + _CA.extentions.privateKey,
        certfile: file + _CA.extentions.caBundle,
        out:      file + _CA.extentions.certificateArchive,
        passout:  'pass:' + options.passPhrase
    });
    await _CA.git('add', file + _CA.extentions.certificateArchive);
};

/**
 * @param {string} file
 * @param {Record} options
 * @returns {Promise<void>}
 */
CA.generateKeyStore = async function (file, options = {}) {
    assert.string(file);
    assert.object(options, {passPhrase: is.string});
    await _CA.keyTool({
        '-importkeystore': true,
        '-noprompt':       true,
        '-srcstoretype':   'pkcs12',
        '-srckeystore':    file + _CA.extentions.certificateArchive,
        '-srcstorepass':   options.passPhrase,
        '-deststoretype':  'jks',
        '-destkeystore':   file + _CA.extentions.keyStore,
        '-deststorepass':  options.passPhrase
    });
    await _CA.git('add', file + _CA.extentions.keyStore);
};

/**
 * @param {string} file
 * @param {Record} options
 * @returns {Promise<void>}
 */
CA.generateCertificateReadableText = async function (file, options = {}) {
    assert.string(file);
    assert.object(options);
    const
        certTextPath = _CA.getOutputPath(file + _CA.extentions.certificateText),
        certText     = await _CA.openSSL('x509', {
            in:    file + _CA.extentions.certificate,
            noout: true,
            text:  true
        });
    await fs.writeFile(certTextPath, certText);
    await _CA.git('add', certTextPath);
};

/**
 * @param {string} file
 * @param {Record} options
 * @returns {Promise<void>}
 */
CA.generateCertificateAuthorityBundle = async function (file, options = {}) {
    assert.string(file);
    assert.object(options, {ca: is.string});
    const
        caCertPath   = _CA.getOutputPath(options.ca + _CA.extentions.certificate),
        caBundlePath = _CA.getOutputPath(options.ca + _CA.extentions.caBundle),
        bundlePath   = _CA.getOutputPath(file + _CA.extentions.caBundle),
        caCert       = await fs.readFile(caCertPath, 'utf-8'),
        certBundle   = [caCert.trim()];
    try {
        const caBundle = await fs.readFile(caBundlePath, 'utf-8');
        certBundle.push(caBundle.trim());
    } catch (err) {
        if (err.code !== 'ENOENT') throw err;
    }
    await fs.writeFile(bundlePath, certBundle.join('\n'));
    await _CA.git('add', bundlePath);
};

/**
 * @param {string} file
 * @returns {Promise<Record<string, string>>}
 */
CA.extractJsonMetadata = async function (file) {
    assert.string(file);
    const
        metadataPath    = _CA.getOutputPath(file),
        certificate     = await fs.readFile(metadataPath + _CA.extentions.certificate, 'utf-8'),
        certificateText = await fs.readFile(metadataPath + _CA.extentions.certificateText, 'utf-8'),
        metadata        = {},
        Issuer_match    = /Issuer:\s*(.*(?=[\r\n]))/.exec(certificateText),
        Subject_match   = /Subject:\s*(.*(?=[\r\n]))/.exec(certificateText),
        SKI_match       = /X509v3 Subject Key Identifier:\s*(\S+(?=\s))/.exec(certificateText),
        AKI_match       = /X509v3 Authority Key Identifier:\s*(\S+(?=\s))/.exec(certificateText);
    if (Issuer_match) metadata.Issuer = Issuer_match[1];
    if (Subject_match) metadata.Subject = Subject_match[1];
    if (SKI_match) metadata.SKI = SKI_match[1];
    if (AKI_match) metadata.AKI = AKI_match[1];
    if (SKI_match && AKI_match) metadata.SKIAKI = metadata.SKI + ':' + metadata.AKI;
    metadata.certSha256Fingerprint = _CA.createCertificateSha256Fingerprint(certificate);
    return metadata;
};

/**
 * @param {string} file
 * @param {Record} options
 * @returns {Promise<void>}
 */
CA.generateJsonMetadata = async function (file, options = {}) {
    assert.string(file);
    assert.object(options);
    const
        metadataPath = _CA.getOutputPath(file),
        metadata     = await CA.extractJsonMetadata(file);
    await fs.writeFile(metadataPath + _CA.extentions.jsonMetadata, JSON.stringify(metadata, null, 4));
    await _CA.git('add', metadataPath + _CA.extentions.jsonMetadata);
};

/**
 * @param {string} file
 * @param {Record} options
 * @returns {Promise<void>}
 */
CA.generateJavaScriptLoader = async function (file, options = {}) {
    assert.string(file);
    assert.object(options);
    const
        filePath  = _CA.getOutputPath(file),
        fileName  = path.basename(file),
        codeLines = [
            `const fs = require('fs'), path = require('path'), crypto = require('crypto');`,
            `const load = (filename) => fs.readFileSync(path.join(__dirname, filename));`,
            `exports.meta = require('./${fileName}${_CA.extentions.jsonMetadata}');`,
            `exports${_CA.extentions.privateKey} = load('./${fileName}${_CA.extentions.privateKey}');`,
            `exports.privateKey = crypto.createPrivateKey(exports${_CA.extentions.privateKey});`,
            `exports${_CA.extentions.publicKey} = load('./${fileName}${_CA.extentions.publicKey}');`,
            `exports.publicKey = crypto.createPublicKey(exports${_CA.extentions.publicKey});`,
            `exports${_CA.extentions.certificate} = load('./${fileName}${_CA.extentions.certificate}');`,
            `exports${_CA.extentions.caBundle} = load('./${fileName}${_CA.extentions.caBundle}');`,
            `Object.freeze(exports);`
        ];
    await fs.writeFile(filePath + _CA.extentions.jsLoader, codeLines.join('\n'));
    await _CA.git('add', filePath + _CA.extentions.jsLoader);
};

/**
 * @param {string} file
 * @param {Record} options
 * @returns {Promise<void>}
 */
CA.generateReadmeInfos = async function (file, options = {}) {
    assert.string(file);
    assert.object(options);
    const
        filePath    = _CA.getOutputPath(file),
        fileName    = path.basename(file),
        metadata    = await CA.extractJsonMetadata(file),
        capitalize  = (val) => val.charAt(0).toUpperCase() + val.slice(1),
        infoContent = markdown.document([
            markdown.h1(capitalize(fileName) + ' Certificate'),
            markdown.h2('Metadata'),
            markdown.ul({
                'Created':            new Date().toISOString(),
                'Issuer':             metadata.Issuer,
                'Subject':            metadata.Subject,
                'SKI':                markdown.code(metadata.SKI),
                'AKI':                markdown.code(metadata.AKI),
                'SKI-AKI':            markdown.code(metadata.SKIAKI),
                'SHA256-Fingerprint': markdown.code(metadata.certSha256Fingerprint)
            }),
            markdown.h2('Files'),
            markdown.ul({
                'Private Key':      markdown.link(fileName + _CA.extentions.privateKey),
                'Public Key':       markdown.link(fileName + _CA.extentions.publicKey),
                'Certificate':      markdown.link(fileName + _CA.extentions.certificate),
                'Certificate Text': markdown.link(fileName + _CA.extentions.certificateText),
                'CA Chain':         markdown.link(fileName + _CA.extentions.caBundle)
            }),
            markdown.h2('Endpoints'),
            markdown.ul({
                'DAPS': markdown.link('https://daps.tb.nicos-rd.com/')
            })
        ]);
    await fs.writeFile(filePath + _CA.extentions.readmeInfos, infoContent);
    await _CA.git('add', filePath + _CA.extentions.readmeInfos);
};

/**
 * @param {string} file
 * @param {Record} options
 * @returns {Promise<void>}
 */
CA.generateRootCertificate = async function (file, options = {}) {
    assert.string(file);
    assert.object(options);
    tty.log.text('generate root certificate: ' + file);
    await _CA.touchFolder(path.dirname(_CA.getOutputPath(file)));
    await _CA.touchFile(_CA.getOutputPath(file + _CA.extentions.certificateConfig));
    await CA.generatePrivateKey(file, options);
    await CA.generateSelfSignedCertificate(file, options);
    await CA.generateCertificateReadableText(file, options);
};

/**
 * @param {string} file
 * @param {Record} options
 * @returns {Promise<void>}
 */
CA.generateSubCertificate = async function (file, options = {}) {
    assert.string(file);
    assert.object(options);
    tty.log.text('generate sub certificate: ' + file);
    await _CA.touchFolder(path.dirname(_CA.getOutputPath(file)));
    await fs.copyFile(
        _CA.getOutputPath(options.ca + _CA.extentions.certificateConfig),
        _CA.getOutputPath(file + _CA.extentions.certificateConfig)
    );
    await _CA.git('add', file + _CA.extentions.certificateConfig);
    await CA.generatePrivateKey(file, options);
    await CA.generateCertificateSigningRequest(file, options);
    await CA.generateSignedCertificate(file, options);
    await CA.generateCertificateAuthorityBundle(file, options);
    await CA.generateCertificateReadableText(file, options);
};

/**
 * @param {string} file
 * @param {Record} options
 * @returns {Promise<void>}
 */
CA.generateClientCertificate = async function (file, options = {}) {
    assert.string(file);
    assert.object(options);
    tty.log.text('generate client certificate: ' + file);
    await _CA.touchFolder(path.dirname(_CA.getOutputPath(file)));
    await CA.generatePrivateKey(file, options);
    await CA.generatePublicKey(file, options);
    await CA.generateCertificateSigningRequest(file, options);
    await CA.generateSignedCertificate(file, options);
    await CA.generateCertificateAuthorityBundle(file, options);
    await CA.generateCertificateReadableText(file, options);
    await CA.generateJsonMetadata(file, options);
    await CA.generateJavaScriptLoader(file, options);
};

/**
 * @param {string} file
 * @param {Record} options
 * @returns {Promise<void>}
 */
CA.generateCustomerCertificate = async function (file, options = {}) {
    assert.string(file);
    assert.object(options);
    tty.log.text('generate customer certificate: ' + file);
    await _CA.touchFolder(path.dirname(_CA.getOutputPath(file)));
    await CA.generatePrivateKey(file, options);
    await CA.generatePublicKey(file, options);
    await CA.generateCertificateSigningRequest(file, options);
    await CA.generateSignedCertificate(file, options);
    await fs.rm(_CA.getOutputPath(file + _CA.extentions.signingRequest));
    await CA.generateCertificateAuthorityBundle(file, options);
    // await CA.generateCertificateArchive(file, options);
    await CA.generateCertificateReadableText(file, options);
    await CA.generateReadmeInfos(file, options);
};

/**
 * @param {string} file
 * @returns {Promise<string>}
 */
CA.readPrivateKey = async function (file) {
    assert.string(file);
    const filePath = _CA.getOutputPath(file + _CA.extentions.privateKey);
    return await fs.readFile(filePath, 'utf-8');
};

/**
 * @param {string} file
 * @returns {Promise<string>}
 */
CA.readPublicKey = async function (file) {
    assert.string(file);
    const filePath = _CA.getOutputPath(file + _CA.extentions.publicKey);
    return await fs.readFile(filePath, 'utf-8');
};

/**
 * @param {string} file
 * @returns {Promise<string>}
 */
CA.readCertificate = async function (file) {
    assert.string(file);
    const filePath = _CA.getOutputPath(file + _CA.extentions.certificate);
    return await fs.readFile(filePath, 'utf-8');
};

/**
 * @param {string} file
 * @returns {Promise<string>}
 */
CA.readCertificateText = async function (file) {
    assert.string(file);
    const filePath = _CA.getOutputPath(file + _CA.extentions.certificateText);
    return await fs.readFile(filePath, 'utf-8');
};

/**
 * @param {string} file
 * @returns {Promise<KeyObject>}
 */
CA.loadPrivateKey = async function (file) {
    assert.string(file);
    const fileContent = await CA.readPrivateKey(file);
    return crypto.createPrivateKey(fileContent);
};

/**
 * @param {string} file
 * @returns {Promise<KeyObject>}
 */
CA.loadPublicKey = async function (file) {
    assert.string(file);
    const fileContent = await CA.readPublicKey(file);
    return crypto.createPublicKey(fileContent);
};

Object.freeze(CA);
module.exports = CA;
