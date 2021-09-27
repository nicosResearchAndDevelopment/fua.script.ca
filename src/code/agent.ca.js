const
    util         = require('./util.js'),
    subprocess   = require('@nrd/fua.module.subprocess'),
    path         = require('path'),
    crypto       = require('crypto'),
    fs           = require('fs/promises'),
    EventEmitter = require('events'),
    _ext         = {
        privateKey:      '.key',
        publicKey:       '.pub',
        certificate:     '.crt',
        certificateText: '.txt',
        signingRequest:  '.csr'
    };

module.exports = class CAAgent extends EventEmitter {

    #cwd     = '';
    #openssl = () => null;

    constructor({cwd = process.cwd(), verbose = false} = {}) {
        super();
        this.#cwd     = cwd;
        this.#openssl = subprocess.ExecutionProcess('openssl', cwd, verbose);
    } // CAAgent#constructor

    async generatePrivateKey(filename) {
        await this.#openssl('genrsa', {
            out: filename + _ext.privateKey
        }, 4096);
    } // CAAgent#generatePrivateKey

    async generatePublicKey(filename) {
        await this.#openssl('rsa', {
            pubout: true,
            in:     filename + _ext.privateKey,
            out:    filename + _ext.publicKey
        });
    } // CAAgent#generatePublicKey

    async generateSelfSignedCertificate(filename) {
        await this.#openssl('req', {
            x509:  true,
            new:   true,
            nodes: true,
            batch: true,
            key:   filename + _ext.privateKey,
            days:  825,
            out:   filename + _ext.certificate
        });
    } // CAAgent#generateSelfSignedCertificate

    async generateCertificateReadableText(filename) {
        await fs.writeFile(
            path.isAbsolute(filename) ? filename : path.join(this.#cwd, filename + _ext.certificateText),
            await this.#openssl('x509', {
                in:    filename + _ext.certificate,
                noout: true,
                text:  true
            })
        );
    } // CAAgent#generateCertificateReadableText

    async generateCertificateSigningRequest(filename) {
        await this.#openssl('req', {
            new:   true,
            batch: true,
            key:   filename + _ext.privateKey,
            out:   filename + _ext.signingRequest
        });
    } // CAAgent#generateCertificateSigningRequest

    async generateSignedCertificate(filename, rootname) {
        await this.#openssl('x509', {
            req:            true,
            CAcreateserial: true,
            CA:             rootname + _ext.certificate,
            CAkey:          rootname + _ext.privateKey,
            days:           398,
            in:             filename + _ext.signingRequest,
            out:            filename + _ext.certificate
        });
    } // CAAgent#generateSignedCertificate

    async generateRootCertificate(filename) {
        await this.generatePrivateKey(filename);
        await this.generateSelfSignedCertificate(filename);
        await this.generateCertificateReadableText(filename);
    } // CAAgent#generateRootCertificate

    async generateClientCertificate(filename, rootname) {
        await this.generatePrivateKey(filename);
        await this.generatePublicKey(filename);
        await this.generateCertificateSigningRequest(filename);
        await this.generateSignedCertificate(filename, rootname);
        await this.generateCertificateReadableText(filename);
    } // CAAgent#generateClientCertificate

    async loadPrivateKey(filename) {
        return crypto.createPrivateKey(await fs.readFile(filename + _ext.privateKey));
    } // CAAgent#loadPrivateKey

    async loadPublicKey(filename) {
        return crypto.createPublicKey(await fs.readFile(filename + _ext.publicKey));
    } // CAAgent#loadPublicKey

}; // CAAgent
