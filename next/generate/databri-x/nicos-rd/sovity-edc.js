const
    async = require('@fua/core.async'),
    tty   = require('@fua/core.tty'),
    CA    = require('../../../src/ca.js');

async.iife(async function generateFiwareCertificates() {

    tty.log.warning('generate databri-x/nicos-rd/sovity-edc');

    await CA.generateCustomerCertificate('databri-x/nicos-rd/sovity-edc/client', {
        ca:      'databri-x/ca',
        subject: {
            country:             'DE',
            organization:        'nicos AG',
            organizational_unit: 'Research',
            common_name:         'sovity-edc.databri-x.nicos-rd.com'
        }
    });

    await CA.generateCertificateArchive('databri-x/nicos-rd/sovity-edc/client', {
        passPhrase: 'XtiwtP41cgE38SEkfaTOqg5ZEO5zvxSZMySRwIzjxVs='
    });

    await CA.generateKeyStore('databri-x/nicos-rd/sovity-edc/client', {
        passPhrase: 'XtiwtP41cgE38SEkfaTOqg5ZEO5zvxSZMySRwIzjxVs='
    });

});
