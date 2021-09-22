const proc = require('./proc.js');

const openssl = (...args) => proc.execProcess(process.cwd(), 'openssl', ...args);

openssl.asn1parse = (...args) => openssl('asn1parse', ...args);
openssl.ca        = (...args) => openssl('ca', ...args);
openssl.ciphers   = (...args) => openssl('ciphers', ...args);
openssl.cms       = (...args) => openssl('cms', ...args);

openssl.crl       = (...args) => openssl('crl', ...args);
openssl.crl2pkcs7 = (...args) => openssl('crl2pkcs7', ...args);
openssl.dgst      = (...args) => openssl('dgst', ...args);
openssl.dhparam   = (...args) => openssl('dhparam', ...args);

openssl.dsa      = (...args) => openssl('dsa', ...args);
openssl.dsaparam = (...args) => openssl('dsaparam', ...args);
openssl.ec       = (...args) => openssl('ec', ...args);
openssl.ecparam  = (...args) => openssl('ecparam', ...args);

openssl.enc    = (...args) => openssl('enc', ...args);
openssl.engine = (...args) => openssl('engine', ...args);
openssl.errstr = (...args) => openssl('errstr', ...args);
openssl.gendsa = (...args) => openssl('gendsa', ...args);

openssl.genpkey = (...args) => openssl('genpkey', ...args);
openssl.genrsa  = (...args) => openssl('genrsa', ...args);
openssl.help    = (...args) => openssl('help', ...args);
openssl.list    = (...args) => openssl('list', ...args);

openssl.nseq   = (...args) => openssl('nseq', ...args);
openssl.ocsp   = (...args) => openssl('ocsp', ...args);
openssl.passwd = (...args) => openssl('passwd', ...args);
openssl.pkcs12 = (...args) => openssl('pkcs12', ...args);

openssl.pkcs7     = (...args) => openssl('pkcs7', ...args);
openssl.pkcs8     = (...args) => openssl('pkcs8', ...args);
openssl.pkey      = (...args) => openssl('pkey', ...args);
openssl.pkeyparam = (...args) => openssl('pkeyparam', ...args);

openssl.pkeyutl = (...args) => openssl('pkeyutl', ...args);
openssl.prime   = (...args) => openssl('prime', ...args);
openssl.rand    = (...args) => openssl('rand', ...args);
openssl.rehash  = (...args) => openssl('rehash', ...args);

openssl.req      = (...args) => openssl('req', ...args);
openssl.rsa      = (...args) => openssl('rsa', ...args);
openssl.rsautl   = (...args) => openssl('rsautl', ...args);
openssl.s_client = (...args) => openssl('s_client', ...args);

openssl.s_server = (...args) => openssl('s_server', ...args);
openssl.s_time   = (...args) => openssl('s_time', ...args);
openssl.sess_id  = (...args) => openssl('sess_id', ...args);
openssl.smime    = (...args) => openssl('smime', ...args);

openssl.speed    = (...args) => openssl('speed', ...args);
openssl.spkac    = (...args) => openssl('spkac', ...args);
openssl.srp      = (...args) => openssl('srp', ...args);
openssl.storeutl = (...args) => openssl('storeutl', ...args);

openssl.ts      = (...args) => openssl('ts', ...args);
openssl.verify  = (...args) => openssl('verify', ...args);
openssl.version = (...args) => openssl('version', ...args);
openssl.x509    = (...args) => openssl('x509', ...args);

module.exports = openssl;
