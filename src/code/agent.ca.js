const
    path         = require('path'),
    fs           = require('fs/promises'),
    openssl      = require('./openssl.js'),
    EventEmitter = require('events');

module.exports = class CAAgent extends EventEmitter {

    constructor(__resources = path.join(__dirname, '../../resources')) {
        super();
        this.__resources = __resources;
    } // CAAgent#constructor

    // TODO

    async parseCert() {
        const text = await openssl.x509({
            in:    path.join(this.__resources, 'root/ca.crt'),
            noout: true,
            text:  true
        });

        // TODO
        return text.replace(/    /g, '|   ');
    } // parseCert

    async generateRootCert() {
        // create root private key
        await openssl.genrsa({
            out: path.join(this.__resources, 'root/ca.key')
        }, 4096);

        // self-sign root cert with private key
        await openssl.req({
            x509:  true,
            new:   true,
            nodes: true,
            batch: true,
            key:   path.join(this.__resources, 'root/ca.key'),
            days:  825,
            out:   path.join(this.__resources, 'root/ca.crt')
        });
    } // CAAgent#generateRootCert

    async generateClientCert() {
        // create client private key
        await openssl.genrsa({
            out: path.join(this.__resources, 'temp/client.key')
        }, 4096);

        // create signing request
        await openssl('req', {
            new:   true,
            batch: true,
            key:   path.join(this.__resources, 'temp/client.key'),
            out:   path.join(this.__resources, 'temp/client.csr')
        });

        // sign request with root ca
        await openssl.x509({
            req:            true,
            CAcreateserial: true,
            days:           398,
            CA:             path.join(this.__resources, 'root/ca.crt'),
            CAkey:          path.join(this.__resources, 'root/ca.key'),
            in:             path.join(this.__resources, 'temp/client.csr'),
            out:            path.join(this.__resources, 'temp/client.crt')
        });

        // create client public key
        await openssl.rsa({
            pubout: true,
            in:     path.join(this.__resources, 'temp/client.key'),
            out:    path.join(this.__resources, 'temp/client.pub')
        });
    } // generateClientCert

}; // CAAgent
