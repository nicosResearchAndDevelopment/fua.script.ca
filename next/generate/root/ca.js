const
    async = require('@nrd/fua.core.async'),
    tty   = require('@nrd/fua.core.tty'),
    CA    = require('../../src/ca.js');

async.iife(async function generateRootCA() {

    tty.log.warning('generate root/ca');

    await CA.generateRootCertificate('root/ca', {
        subject:    {
            country:      'DE',
            province:     'NRW',
            locality:     'Muenster',
            organization: 'nicos AG',
            commonName:   'root_ca'
        },
        expiration: {
            years: 20
        }
    });

});
