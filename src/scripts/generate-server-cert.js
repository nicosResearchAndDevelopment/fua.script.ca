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

	console.log('Create Device Certificate');
	await openssl('genrsa', {
		'out': joinPath(__certs, 'server/private-key.pem'),
		'4096': false
	});

	console.log('Create request from Device');
	await openssl('req', {
		'new': true,
		'key': joinPath(__certs, 'server/private-key.pem'),
		'out': joinPath(__certs, 'tmp/csr.pem'),
		'subj': '/C=DE/ST=NRW/L=Muenster/O=nicos AG/OU=Research/CN=request'
	});

	console.log('Sign request from Device');
	await openssl('x509', {
		'req': true,
		'in': joinPath(__certs, 'tmp/csr.pem'),
		'CA': joinPath(__certs, 'ca/root.crt.pem'),
		'CAkey': joinPath(__certs, 'ca/root.key.pem'),
		'CAcreateserial': true,
		'days': 365,
		'out': joinPath(__certs, 'server/cert.pem')
	});

	console.log('Create public key');
	await openssl('rsa', {
		'in': joinPath(__certs, 'server/private-key.pem'),
		'pubout': true,
		'out': joinPath(__certs, 'client/public-key.pem')
	});

})(/* async-iife */).catch(console.error);