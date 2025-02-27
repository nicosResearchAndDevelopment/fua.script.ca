const
    util         = require('./util.ca.js'),
    subprocess   = require('@fua/module.subprocess'),
    path         = require('path'),
    crypto       = require('crypto'),
    fs           = require('fs/promises'),
    EventEmitter = require('events'),
    _ext         = Object.freeze({
        privateKey:         '.key',
        publicKey:          '.pub',
        certificate:        '.cert',
        certificateText:    '.txt',
        certificateArchive: '.p12',
        signingRequest:     '.csr',
        certificateConfig:  '.conf',
        caBundle:           '.ca',
        jsonMetadata:       '.json',
        jsLoader:           '.js',
        readmeInfos:        '.md'
    }),
    // SEE https://www.rfc-editor.org/rfc/rfc5280#section-4.1.2.4
    // SEE https://docs.oracle.com/cd/E24191_01/common/tutorials/authz_cert_attributes.html
    // SEE https://www.ibm.com/docs/en/ibm-mq/7.5?topic=certificates-distinguished-names
    // SEE https://www.cryptosys.net/pki/manpki/pki_distnames.html
    _dnMap       = Object.freeze({
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
 * @param {string | {[key: string]: string | Array<string>} | Array<string, {[key: string]: string | Array<string>}>} dn
 * @returns {string | null}
 * @private
 */
function _serializeDistinguishedName(dn) {
    if (!dn) return null;
    if (util.isString(dn)) {
        if (dn.startsWith('/')) return dn;
        else return '/' + dn;
    }
    if (util.isArray(dn)) {
        if (dn.length === 0) return null;
        return dn.map(_serializeDistinguishedName).join('');
    }
    if (util.isObject(dn)) {
        const resultArr = [];
        for (let [key, value] of Object.entries(dn)) {
            const attr = _dnMap[key.toLowerCase().replace(/[\-_]/g, '')];
            if (!attr) continue;
            if (util.isArray(value)) {
                for (let entry of value) {
                    resultArr.push(attr + '=' + entry);
                }
            } else {
                resultArr.push(attr + '=' + value);
            }
        }
        return _serializeDistinguishedName(resultArr);
    }
} // _serializeDistinguishedName

function _calculateExpirationDays(exp) {
    const seconds = util.duration(exp);
    util.assert(seconds > 0 && seconds < Infinity, 'expected to be a positive number');
    return Math.floor(seconds / 86400) || 1;
}

module.exports = class CAAgent extends EventEmitter {

    #cwd     = '';
    #openssl = () => undefined;

    constructor({cwd = process.cwd(), verbose = false} = {}) {
        super();
        this.#cwd     = cwd;
        this.#openssl = subprocess.ExecutionProcess('openssl', {cwd, verbose, encoding: 'utf-8'});
    } // CAAgent#constructor

    async generatePrivateKey(file, options) {
        await this.#openssl('genrsa', {
            out: file + _ext.privateKey
        }, 4096);
    } // CAAgent#generatePrivateKey

    async generatePublicKey(file, options) {
        await this.#openssl('rsa', {
            pubout: true,
            in:     file + _ext.privateKey,
            out:    file + _ext.publicKey
        });
    } // CAAgent#generatePublicKey

    async generateSelfSignedCertificate(file, options) {
        await this.#openssl('req', {
            x509:  true,
            new:   true,
            nodes: true,
            batch: !options?.subject,
            subj:  _serializeDistinguishedName(options?.subject) || false,
            key:   file + _ext.privateKey,
            days:  options?.expiration && _calculateExpirationDays(options.expiration) || 825,
            out:   file + _ext.certificate
        });
    } // CAAgent#generateSelfSignedCertificate

    async generateCertificateSigningRequest(file, options) {
        await this.#openssl('req', {
            new:   true,
            batch: !options?.subject,
            subj:  _serializeDistinguishedName(options?.subject) || false,
            key:   file + _ext.privateKey,
            out:   file + _ext.signingRequest
        });
    } // CAAgent#generateCertificateSigningRequest

    async generateSignedCertificate(file, options) {
        util.assert(options?.ca, 'expected ca');
        await this.#openssl('x509', {
            req:            true,
            CAcreateserial: true,
            CA:             options.ca + _ext.certificate,
            CAkey:          options.ca + _ext.privateKey,
            days:           options?.expiration && _calculateExpirationDays(options.expiration) || 398,
            in:             file + _ext.signingRequest,
            out:            file + _ext.certificate,
            extfile:        options.ca + _ext.certificateConfig,
            extensions:     options.extensions || 'default'
        });
    } // CAAgent#generateSignedCertificate

    async generateCertificateArchive(file, options) {
        util.assert(options?.passPhrase, 'expected passPhrase');
        await this.#openssl('pkcs12', {
            export:   true,
            in:       file + _ext.certificate,
            inkey:    file + _ext.privateKey,
            certfile: file + _ext.caBundle,
            out:      file + _ext.certificateArchive,
            pass:     'pass:' + options.passPhrase
        });
    } // CAAgent#generateCertificateArchive

    async generateCertificateReadableText(file, options) {
        const filePath = util.resolvePath(file + _ext.certificateText, this.#cwd);
        await fs.writeFile(
            filePath,
            await this.#openssl('x509', {
                in:    file + _ext.certificate,
                noout: true,
                text:  true
            })
        );
    } // CAAgent#generateCertificateReadableText

    async generateCertificateAuthorityBundle(file, options) {
        let
            caCertPath   = util.resolvePath(options.ca + _ext.certificate, this.#cwd),
            caCert       = await fs.readFile(caCertPath, 'utf-8'),
            caBundlePath = util.resolvePath(options.ca + _ext.caBundle, this.#cwd),
            caBundle     = null,
            bundlePath   = util.resolvePath(file + _ext.caBundle, this.#cwd),
            bundle       = caCert.trim();

        try {
            caBundle = await fs.readFile(caBundlePath, 'utf-8');
            bundle += '\n';
            bundle += caBundle.trim();
        } catch (err) {
            if (err.code !== 'ENOENT') throw err;
        }

        await fs.writeFile(bundlePath, bundle);
    } // CAAgent#generateCertificateAuthorityBundle

    async extractJsonMetadata(file, options) {
        const
            filePath        = util.resolvePath(file, this.#cwd),
            certificate     = await fs.readFile(filePath + _ext.certificate, {encoding: 'utf-8'}),
            certificateText = await fs.readFile(filePath + _ext.certificateText, {encoding: 'utf-8'}),
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
        metadata.certSha256Fingerprint = util.createCertificateSha256Fingerprint(certificate);
        return metadata;
    }

    async generateJsonMetadata(file, options) {
        const
            filePath = util.resolvePath(file, this.#cwd),
            metadata = await this.extractJsonMetadata(file, options);
        await fs.writeFile(filePath + _ext.jsonMetadata, JSON.stringify(metadata, null, 4));
    } // CAAgent#generateJsonMetadata

    async generateJavaScriptLoader(file, options) {
        const
            filePath  = util.resolvePath(file, this.#cwd),
            fileName  = path.basename(file),
            codeLines = [
                `const fs = require('fs'), path = require('path'), crypto = require('crypto');`,
                `const load = (filename) => fs.readFileSync(path.join(__dirname, filename));`,
                `exports.meta = require('./${fileName}${_ext.jsonMetadata}');`,
                `exports${_ext.privateKey} = load('./${fileName}${_ext.privateKey}');`,
                `exports.privateKey = crypto.createPrivateKey(exports${_ext.privateKey});`,
                `exports${_ext.publicKey} = load('./${fileName}${_ext.publicKey}');`,
                `exports.publicKey = crypto.createPublicKey(exports${_ext.publicKey});`,
                `exports${_ext.certificate} = load('./${fileName}${_ext.certificate}');`,
                `exports${_ext.caBundle} = load('./${fileName}${_ext.caBundle}');`,
                `Object.freeze(exports);`
            ];
        await fs.writeFile(filePath + _ext.jsLoader, codeLines.join('\n'));
    } // CAAgent#generateJavaScriptLoader

    async generateReadmeInfos(file, options) {
        const
            filePath    = util.resolvePath(file, this.#cwd),
            fileName    = path.basename(file),
            metadata    = await this.extractJsonMetadata(file, options),
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
                    'Private Key':      Link(fileName + _ext.privateKey),
                    'Public Key':       Link(fileName + _ext.publicKey),
                    'Certificate':      Link(fileName + _ext.certificate),
                    'Certificate Text': Link(fileName + _ext.certificateText),
                    'CA Chain':         Link(fileName + _ext.caBundle)
                }),
                SubTitle('Endpoints'),
                ObjectList({
                    'DAPS': Link('https://daps.tb.nicos-rd.com/')
                })
            ]);
        await fs.writeFile(filePath + _ext.readmeInfos, infoContent);
    } // CAAgent#generateReadmeInfos

    async generateRootCertificate(file, options) {
        util.logText('generate root certificate: ' + file);
        await util.touchFolder(path.dirname(util.resolvePath(file, this.#cwd)));
        await util.touchFile(util.resolvePath(file + _ext.certificateConfig, this.#cwd));
        await this.generatePrivateKey(file, options);
        await this.generateSelfSignedCertificate(file, options);
        await this.generateCertificateReadableText(file, options);
    } // CAAgent#generateRootCertificate

    async generateSubCertificate(file, options) {
        util.logText('generate sub certificate: ' + file);
        await util.touchFolder(path.dirname(util.resolvePath(file, this.#cwd)));
        await fs.copyFile(
            util.resolvePath(options.ca + _ext.certificateConfig, this.#cwd),
            util.resolvePath(file + _ext.certificateConfig, this.#cwd)
        );
        await this.generatePrivateKey(file, options);
        await this.generateCertificateSigningRequest(file, options);
        await this.generateSignedCertificate(file, options);
        await this.generateCertificateAuthorityBundle(file, options);
        await this.generateCertificateReadableText(file, options);
    } // CAAgent#generateSubCertificate

    async generateClientCertificate(file, options) {
        util.logText('generate client certificate: ' + file);
        await util.touchFolder(path.dirname(util.resolvePath(file, this.#cwd)));
        await this.generatePrivateKey(file, options);
        await this.generatePublicKey(file, options);
        await this.generateCertificateSigningRequest(file, options);
        await this.generateSignedCertificate(file, options);
        await this.generateCertificateAuthorityBundle(file, options);
        await this.generateCertificateReadableText(file, options);
        await this.generateJsonMetadata(file, options);
        await this.generateJavaScriptLoader(file, options);
    } // CAAgent#generateClientCertificate

    async generateCustomerCertificate(file, options) {
        util.logText('generate customer certificate: ' + file);
        await util.touchFolder(path.dirname(util.resolvePath(file, this.#cwd)));
        await this.generatePrivateKey(file, options);
        await this.generatePublicKey(file, options);
        await this.generateCertificateSigningRequest(file, options);
        await this.generateSignedCertificate(file, options);
        await fs.rm(util.resolvePath(file + _ext.signingRequest, this.#cwd));
        await this.generateCertificateAuthorityBundle(file, options);
        // await this.generateCertificateArchive(file, options);
        await this.generateCertificateReadableText(file, options);
        await this.generateReadmeInfos(file, options);
    } // CAAgent#generateCustomerCertificate

    async readPrivateKey(file) {
        const filePath = util.resolvePath(file + _ext.privateKey, this.#cwd);
        return await fs.readFile(filePath, {encoding: 'utf-8'});
    } // CAAgent#readPrivateKey

    async readPublicKey(file) {
        const filePath = util.resolvePath(file + _ext.publicKey, this.#cwd);
        return await fs.readFile(filePath, {encoding: 'utf-8'});
    } // CAAgent#readPublicKey

    async readCertificate(file) {
        const filePath = util.resolvePath(file + _ext.certificate, this.#cwd);
        return await fs.readFile(filePath, {encoding: 'utf-8'});
    } // CAAgent#readCertificate

    async readCertificateText(file) {
        const filePath = util.resolvePath(file + _ext.certificateText, this.#cwd);
        return await fs.readFile(filePath, {encoding: 'utf-8'});
    } // CAAgent#readCertificateText

    async loadPrivateKey(file) {
        const fileContent = await this.readPrivateKey(file);
        return crypto.createPrivateKey(fileContent);
    } // CAAgent#loadPrivateKey

    async loadPublicKey(file) {
        const fileContent = await this.readPublicKey(file);
        return crypto.createPublicKey(fileContent);
    } // CAAgent#loadPublicKey

}; // CAAgent
