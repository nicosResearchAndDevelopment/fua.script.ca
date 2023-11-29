const
    async = require('@nrd/fua.core.async'),
    tty   = require('@nrd/fua.core.tty'),
    CA    = require('../../src/ca.js');

async.iife(async function generateTestbedCA() {

    tty.log.warning('generate: testbed/ca');

    await CA.generateSubCertificate('testbed/ca', {
        ca:         'root/ca',
        subject:    {
            C:  'DE',
            S:  'NRW',
            L:  'Muenster',
            O:  'nicos AG',
            CN: ['tb', 'tb_ca']
        },
        extensions: 'root_extension',
        expiration: {
            years: 10
        }
    });

});
