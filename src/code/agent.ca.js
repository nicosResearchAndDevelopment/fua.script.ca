const
    util         = require('./util.js'),
    subprocess   = require('@nrd/fua.module.subprocess'),
    path         = require('path'),
    crypto       = require('crypto'),
    fs           = require('fs/promises'),
    EventEmitter = require('events'),
    _ext         = Object.freeze({
        privateKey:        '.key',
        publicKey:         '.pub',
        certificate:       '.cert',
        certificateText:   '.txt',
        signingRequest:    '.csr',
        certificateConfig: '.conf',
        jsonMetadata:      '.json',
        jsLoader:          '.js'
    });

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
            subj:  options?.subject || false,
            key:   file + _ext.privateKey,
            days:  825,
            out:   file + _ext.certificate
        });
    } // CAAgent#generateSelfSignedCertificate

    async generateCertificateSigningRequest(file, options) {
        await this.#openssl('req', {
            new:   true,
            batch: !options?.subject,
            subj:  options?.subject || false,
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
            days:           398,
            in:             file + _ext.signingRequest,
            out:            file + _ext.certificate,
            extfile:        options.ca + _ext.certificateConfig,
            extensions:     'ski_aki'
        });
    } // CAAgent#generateSignedCertificate

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

    async generateJsonMetadata(file, options) {
        const
            filePath        = util.resolvePath(file, this.#cwd),
            certificateText = await fs.readFile(filePath + _ext.certificateText, {encoding: 'utf-8'}),
            metadata        = {},
            SKI_match       = /X509v3 Subject Key Identifier:\s*(\S+(?=\s))/.exec(certificateText),
            AKI_match       = /X509v3 Authority Key Identifier:\s*(\S+(?=\s))/.exec(certificateText);
        if (SKI_match) metadata.SKI = SKI_match[1];
        if (AKI_match) metadata.AKI = AKI_match[1];
        metadata.SKIAKI          = metadata.SKI + ":" + metadata.AKI;
        metadata.SKIAKI_id_leave = metadata.SKIAKI.replace(/:/g, "_");
        await fs.writeFile(filePath + _ext.jsonMetadata, JSON.stringify(metadata, null, 4));
    } // CAAgent#generateJsonMetadata

    async generateJavaScriptLoader(file, options) {
        const
            filePath  = util.resolvePath(file, this.#cwd),
            fileName  = path.basename(file),
            codeLines = [
                `const fs = require('fs'), path = require('path'), crypto = require('crypto');`,
                `exports.meta = require('./${fileName}${_ext.jsonMetadata}');`,
                `exports${_ext.privateKey} = fs.readFileSync(path.join(__dirname, './${fileName}${_ext.privateKey}'));`,
                `exports.privateKey = crypto.createPrivateKey(exports${_ext.privateKey});`,
                `exports${_ext.publicKey} = fs.readFileSync(path.join(__dirname, './${fileName}${_ext.publicKey}'));`,
                `exports.publicKey = crypto.createPublicKey(exports${_ext.publicKey});`,
                `exports${_ext.certificate} = fs.readFileSync(path.join(__dirname, './${fileName}${_ext.certificate}'));`,
                `Object.freeze(exports);`
            ];
        await fs.writeFile(filePath + _ext.jsLoader, codeLines.join('\n'));
    } // CAAgent#generateJavaScriptLoader

    async generateRootCertificate(file, options) {
        await util.touchFolder(path.dirname(util.resolvePath(file, this.#cwd)));
        await util.touchFile(util.resolvePath(file + _ext.certificateConfig, this.#cwd));
        await this.generatePrivateKey(file, options);
        await this.generateSelfSignedCertificate(file, options);
        await this.generateCertificateReadableText(file, options);
    } // CAAgent#generateRootCertificate

    async generateClientCertificate(file, options) {
        await util.touchFolder(path.dirname(util.resolvePath(file, this.#cwd)));
        await this.generatePrivateKey(file, options);
        await this.generatePublicKey(file, options);
        await this.generateCertificateSigningRequest(file, options);
        await this.generateSignedCertificate(file, options);
        await this.generateCertificateReadableText(file, options);
        await this.generateJsonMetadata(file, options);
        await this.generateJavaScriptLoader(file, options);
    } // CAAgent#generateClientCertificate

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
