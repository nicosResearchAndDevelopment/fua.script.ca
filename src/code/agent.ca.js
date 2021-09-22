const
    path         = require('path'),
    openssl      = require('./openssl.js'),
    EventEmitter = require('events');

module.exports = class CAAgent extends EventEmitter {

    constructor(__resources = path.join(__dirname, '../../resources')) {
        super();
        this.__resources = __resources;
    } // CAAgent#constructor

    async generateRootCA() {
        console.log('Create Root Certificate Authority');
        await openssl.genrsa({
            out: path.join(this.__resources, 'root_ca/key.pem')
        }, 4096);

        console.log('Self-sign Root Certificate Authority');
        await openssl.req({
            x509:  true,
            new:   true,
            nodes: true,
            batch: true,
            key:   path.join(this.__resources, 'root_ca/key.pem'),
            days:  10 * 365,
            out:   path.join(this.__resources, 'root_ca/crt.pem')
        });
    } // CAAgent#generateRootCA

}; // CAAgent
