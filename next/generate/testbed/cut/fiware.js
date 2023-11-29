const
    async = require('@nrd/fua.core.async'),
    tty   = require('@nrd/fua.core.tty'),
    CA    = require('../../../src/ca.js');

async.iife(async function generateFiwareCertificates() {

    tty.log.warning('generate: testbed/cut/fiware');

    await CA.generateMinimalClientCertificate('testbed/cut/fiware/dev/client', {
        ca:      'testbed/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.fiware.dev'
        }
    });

    await CA.generateMinimalClientCertificate('testbed/cut/fiware/dev/server', {
        ca:      'testbed/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.fiware.dev'
        }
    });

    await CA.generateMinimalClientCertificate('testbed/cut/fiware/car-kim/client', {
        ca:      'testbed/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.car-kim.fiware-dataspace-connector.org'
        }
    });

    await CA.generateMinimalClientCertificate('testbed/cut/fiware/car-kim/server', {
        ca:      'testbed/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.car-kim.fiware-dataspace-connector.org'
        }
    });

    await CA.generateMinimalClientCertificate('testbed/cut/fiware/platform-kim/client', {
        ca:      'testbed/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.platform-kim.fiware-dataspace-connector.org'
        }
    });

    await CA.generateMinimalClientCertificate('testbed/cut/fiware/platform-kim/server', {
        ca:      'testbed/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.platform-kim.fiware-dataspace-connector.org'
        }
    });

});
