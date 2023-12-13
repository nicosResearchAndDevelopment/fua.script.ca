const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    DN               = require('../src/dn.js');

describe('fua.script.ca.dn', function () {

    test('serialize a distinguished name object', function () {
        const dn = DN.serialize({
            country:      'DE',
            province:     'NRW',
            locality:     'Muenster',
            organization: 'nicos AG',
            commonName:   ['lorem', 'ipsum']
        });
        console.log(dn);
        expect(DN.pattern).toBeInstanceOf(RegExp);
        expect(dn).toMatch(DN.pattern);
    });

    test('parse a distinguished name', function () {
        const dnObj = DN.parse('/C=DE/ST=NRW/L=Muenster/O=nicos AG/CN=lorem/CN=ipsum');
        console.log(dnObj);
        expect(dnObj).toMatchObject({
            C:  'DE',
            ST: 'NRW',
            L:  'Muenster',
            O:  'nicos AG',
            CN: ['lorem', 'ipsum']
        });
    });

});
