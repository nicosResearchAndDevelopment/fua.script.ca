const
    async = require('@fua/core.async'),
    tty   = require('@fua/core.tty'),
    CA    = require('../../src/ca.js');

async.iife(async function generateTestbedCA() {

    tty.log.warning('generate databri-x/ca');

    await CA.generateSubCertificate('databri-x/ca', {
        ca:         'root/ca',
        subject:    {
            country:      'DE',
            province:     'NRW',
            locality:     'Muenster',
            organization: 'nicos AG',
            commonName:   'DataBri-X'
        },
        extensions: 'root_extension',
        expiration: {
            years: 10
        }
    });

});
