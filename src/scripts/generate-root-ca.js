const
	{ promisify } = require('util'),
	// fs = require('fs'),
	// readFile = promisify(fs.readFile),
	// writeFile = promisify(fs.writeFile),
	{ join: joinPath } = require('path'),
	// https://www.npmjs.com/package/openssl-wrapper
	openssl_wrapper = require('openssl-wrapper'),
	// https://www.openssl.org/docs/man1.0.2/man1/
	openssl = promisify(openssl_wrapper.exec),
	__certs = joinPath(__dirname, '../../certs');

(async (/* async-iife */) => {

	console.log('Create Root Certificate Authority');
	await openssl('genrsa', {
		'out': joinPath(__certs, 'ca/root.key.pem'),
		'4096': false
	});

	console.log('Self-sign Root Certificate Authority');
	await openssl('req', {
		'x509': true,
		'new': true,
		'nodes': true,
		'key': joinPath(__certs, 'ca/root.key.pem'),
		'days': 10 * 365,
		'out': joinPath(__certs, 'ca/root.crt.pem'),
		'subj': '/C=DE/ST=NRW/L=Muenster/O=nicos AG/OU=Research/CN=root'
	});

})(/* async-iife */).catch(console.error);