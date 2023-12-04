const
    CA         = exports,
    identifier = '@nrd/fua.script.ca',
    assert     = require('@nrd/fua.core.assert');

assert(!global[identifier], 'unable to load a second uncached version of the singleton ' + identifier);
Object.defineProperty(global, identifier, {value: CA, configurable: false, writable: false, enumerable: false});

const
    _CA         = Object.create(null),
    path        = require('path'),
    crypto      = require('crypto'),
    fs          = require('fs/promises'),
    is          = require('@nrd/fua.core.is'),
    ts          = require('@nrd/fua.core.ts'),
    tty         = require('@nrd/fua.core.tty'),
    subprocess  = require('@nrd/fua.module.subprocess'),
    processArgs = subprocess.parseArgv(process.argv);

_CA.outputDir = path.join(__dirname, '../data');
_CA.openSSL   = subprocess.ExecutionProcess('openssl', {
    cwd:      _CA.outputDir,
    verbose:  !!processArgs.verbose,
    encoding: 'utf-8'
});
_CA.git       = subprocess.ExecutionProcess('git', {
    cwd:      _CA.outputDir,
    verbose:  !!processArgs.verbose,
    encoding: 'utf-8'
});

_CA.extentions = Object.freeze({
    privateKey:        '.key',
    publicKey:         '.pub',
    certificate:       '.cert',
    certificateText:   '.txt',
    signingRequest:    '.csr',
    certificateConfig: '.conf',
    caBundle:          '.ca',
    caSerial:          '.srl',
    jsonMetadata:      '.json',
    jsLoader:          '.js',
    readmeInfos:       '.md'
});

/**
 * @see https://www.rfc-editor.org/rfc/rfc5280#section-4.1.2.4
 * @see https://docs.oracle.com/cd/E24191_01/common/tutorials/authz_cert_attributes.html
 * @see https://www.ibm.com/docs/en/ibm-mq/7.5?topic=certificates-distinguished-names
 * @see https://www.cryptosys.net/pki/manpki/pki_distnames.html
 */
_CA.distinguishedNames = Object.freeze({
    // country
    // C: CountryName
    // C	Country
    // C	countryName	2.5.4.6
    c:           'C',
    country:     'C',
    countryname: 'C',

    // organization
    // O: Organization
    // O	Organization name
    // O	organizationName	2.5.4.10
    o:                'O',
    organization:     'O',
    organizationname: 'O',

    // organizational unit
    // OU: OrganizationalUnit
    // OU	Organizational Unit name
    // OU	organizationalUnit	2.5.4.11
    ou:                     'OU',
    organizationalunit:     'OU',
    organizationalunitname: 'OU',

    // distinguished name qualifier
    // DNQ	Distinguished name qualifier
    dnq:                        'DNQ',
    distinguishednamequalifier: 'DNQ',

    // state or province name
    // S: StateOrProvinceName
    // ST (or SP or S)	State or Province name
    // ST or S	stateOrProvinceName	2.5.4.8
    s:                   'ST',
    st:                  'ST',
    state:               'ST',
    statename:           'ST',
    province:            'ST',
    provincename:        'ST',
    stateorprovince:     'ST',
    stateorprovincename: 'ST',

    // common name (e.g., "Susan Housley")
    // CN: CommonName
    // CN	Common Name
    // CN	commonName	2.5.4.3
    cn:         'CN',
    commonname: 'CN',

    // serial number
    // SERIALNUMBER	Certificate serial number
    // SERIALNUMBER	serialNumber	2.5.4.5
    serialnumber: 'SERIALNUMBER',

    // locality
    // L: Locality
    // L	Locality name
    // L	localityName	2.5.4.7
    l:            'L',
    locality:     'L',
    localityname: 'L',

    // title
    // T	Title
    // T or TITLE	title	2.5.4.12
    t:     'T',
    title: 'T',

    // surname
    // SN	surname	2.5.4.4
    sn:      'SN',
    surname: 'SN',

    // given name
    // G or GN	givenName	2.5.4.42
    gn:        'GN',
    givenname: 'GN',

    // initials

    // pseudonym

    // generation qualifier (e.g., "Jr.", "3rd", or "IV")

    // MAIL	Email address
    // E	Email address (Deprecated in preference to MAIL)
    // E	emailAddress (deprecated)	1.2.840.113549.1.9.1
    e:     'MAIL',
    mail:  'MAIL',
    email: 'MAIL',

    // UID or USERID	User identifier
    // UID	userID	0.9.2342.19200300.100.1.1
    uid:    'UID',
    userid: 'UID',

    // DC	Domain component
    // DC	domainComponent	0.9.2342.19200300.100.1.25
    dc:              'DC',
    domaincomponent: 'DC',

    // STREET	Street / First line of address
    // STREET	streetAddress	2.5.4.9
    street: 'STREET',

    // PC	Postal code / zip code
    pc:         'PC',
    postalcode: 'PC',

    // UNSTRUCTUREDNAME	Host name
    unstructuredname: 'UNSTRUCTUREDNAME',
    hostname:         'UNSTRUCTUREDNAME',

    // UNSTRUCTUREDADDRESS	IP address
    unstructuredaddress: 'UNSTRUCTUREDADDRESS',
    ipaddress:           'UNSTRUCTUREDADDRESS'
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
 * @param {string | {[key: string]: string | Array<string>} | Array<string, {[key: string]: string | Array<string>}>} dn
 * @returns {string | null}
 */
_CA.serializeDistinguishedName = function (dn) {
    if (!dn) return null;
    if (is.string(dn)) {
        if (dn.startsWith('/')) return dn;
        else return '/' + dn;
    }
    if (is.array(dn)) {
        if (dn.length === 0) return null;
        return dn.map(_CA.serializeDistinguishedName).join('');
    }
    if (is.object(dn)) {
        const resultArr = [];
        for (let [key, value] of Object.entries(dn)) {
            const attr = _CA.distinguishedNames[key.toLowerCase().replace(/[\-_]/g, '')];
            if (!attr) continue;
            if (is.array(value)) {
                for (let entry of value) {
                    resultArr.push(attr + '=' + entry);
                }
            } else {
                resultArr.push(attr + '=' + value);
            }
        }
        return _CA.serializeDistinguishedName(resultArr);
    }
}

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
        subj:  _CA.serializeDistinguishedName(options.subject) || false,
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
        subj:  _CA.serializeDistinguishedName(options.subject) || false,
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
        bundlePath   = _CA.getOutputPath((file + _CA.extentions.caBundle)),
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
        Bold        = (val) => val ? '**' + val + '**' : '',
        Code        = (val) => val ? '`' + val + '`' : '',
        Document    = (arr) => arr.filter(val => val).join('\n\n'),
        Title       = (val) => val ? '# ' + val : '',
        Link        = (href, label) => '[' + (label || href) + '](' + href + ')',
        SubTitle    = (val) => val ? '## ' + val : '',
        List        = (arr) => arr.filter(val => val).map(val => '- ' + val).join('\n'),
        ObjectList  = (obj) => List(Object.entries(obj).filter(([key, val]) => val).map(([key, val]) => Bold(key + ':') + ' ' + val)),
        infoContent = Document([
            Title(capitalize(fileName) + ' Certificate'),
            SubTitle('Metadata'),
            ObjectList({
                'Created':            new Date().toISOString(),
                'Issuer':             metadata.Issuer,
                'Subject':            metadata.Subject,
                'SKI':                Code(metadata.SKI),
                'AKI':                Code(metadata.AKI),
                'SKI-AKI':            Code(metadata.SKIAKI),
                'SHA256-Fingerprint': Code(metadata.certSha256Fingerprint)
            }),
            SubTitle('Files'),
            ObjectList({
                'Private Key':      Link(fileName + _CA.extentions.privateKey),
                'Public Key':       Link(fileName + _CA.extentions.publicKey),
                'Certificate':      Link(fileName + _CA.extentions.certificate),
                'Certificate Text': Link(fileName + _CA.extentions.certificateText),
                'CA Chain':         Link(fileName + _CA.extentions.caBundle)
            }),
            SubTitle('Endpoints'),
            ObjectList({
                'DAPS': Link('https://daps.tb.nicos-rd.com/')
            })
        ]);
    await fs.writeFile(filePath + _CA.extentions.readmeInfos, infoContent);
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
