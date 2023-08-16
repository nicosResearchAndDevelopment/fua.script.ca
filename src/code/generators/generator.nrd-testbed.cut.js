const
    generators = exports,
    util       = require('../util.ca.js');

generators['nrd-testbed/ec/ids/cut']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/nrd_gbx-03'](param);
    await generators['nrd-testbed/ec/ids/cut/dsc'](param);
    await generators['nrd-testbed/ec/ids/cut/FIWARE'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX'](param);
};

generators['nrd-testbed/ec/ids/cut/nrd_gbx-03']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/nrd_gbx-03/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/nrd_gbx-03/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/nrd_gbx-03/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/nrd_gbx-03/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'ec', 'ids', 'cut', 'ec_ids_connector_nrd_gbx-03']
        }
    });
};

generators['nrd-testbed/ec/ids/cut/nrd_gbx-03/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/nrd_gbx-03/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'gbx.nicos-rd.com']
        }
    });
};

generators['nrd-testbed/ec/ids/cut/dsc']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/dsc/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/dsc/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/dsc/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/dsc/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'ec_ids_dsc_connector']
        }
    });
};

generators['nrd-testbed/ec/ids/cut/dsc/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/dsc/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            ...defaults.subject,
            CN: ['tb', 'ids-dsc.nicos-rd.com']
        }
    });
};

generators['nrd-testbed/ec/ids/cut/FIWARE']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/FIWARE/dev'](param);
    await generators['nrd-testbed/ec/ids/cut/FIWARE/car-kim'](param);
    await generators['nrd-testbed/ec/ids/cut/FIWARE/platform-kim'](param);
};

generators['nrd-testbed/ec/ids/cut/FIWARE/dev']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/FIWARE/dev/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/FIWARE/dev/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/FIWARE/dev/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/FIWARE/dev/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.fiware.dev'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/FIWARE/dev/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/FIWARE/dev/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.fiware.dev'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/FIWARE/car-kim']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/FIWARE/car-kim/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/FIWARE/car-kim/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/FIWARE/car-kim/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/FIWARE/car-kim/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.car-kim.fiware-dataspace-connector.org'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/FIWARE/car-kim/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/FIWARE/car-kim/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.car-kim.fiware-dataspace-connector.org'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/FIWARE/platform-kim']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/FIWARE/platform-kim/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/FIWARE/platform-kim/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/FIWARE/platform-kim/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/FIWARE/platform-kim/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.platform-kim.fiware-dataspace-connector.org'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/FIWARE/platform-kim/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/FIWARE/platform-kim/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'FIWARE Foundation e.V.',
            organizational_unit: 'KIM',
            common_name:         '*.platform-kim.fiware-dataspace-connector.org'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/1'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/2'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/3'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/1']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/1/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/1/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/1/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/FIT/1/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'FIT',
            common_name:         '*.fit.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/1/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/FIT/1/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'FIT',
            common_name:         '*.fit.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/2']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/2/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/2/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/2/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/FIT/2/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'FIT',
            common_name:         '*.fit.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/2/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/FIT/2/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'FIT',
            common_name:         '*.fit.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/3']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/3/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/FIT/3/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/3/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/FIT/3/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'FIT',
            common_name:         '*.fit.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/FIT/3/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/FIT/3/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'FIT',
            common_name:         '*.fit.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/1'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/2'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/3'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/1']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/1/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/1/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/1/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/IMW/1/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'IMW',
            common_name:         '*.imw.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/1/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/IMW/1/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'IMW',
            common_name:         '*.imw.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/2']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/2/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/2/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/2/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/IMW/2/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'IMW',
            common_name:         '*.imw.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/2/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/IMW/2/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'IMW',
            common_name:         '*.imw.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/3']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/3/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/WNW/IMW/3/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/3/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/IMW/3/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'IMW',
            common_name:         '*.imw.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/WNW/IMW/3/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/WNW/IMW/3/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:             'DE',
            organization:        'Fraunhofer e.V.',
            organizational_unit: 'IMW',
            common_name:         '*.imw.fraunhofer.de'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/SWC'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/DUM'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/SWC']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/SWC/1'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/SWC/2'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/SWC/3'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/SWC/1']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/SWC/1/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/SWC/1/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/SWC/1/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/SWC/1/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'AT',
            organization: 'Semantic Web Company GmbH',
            common_name:  '*.semantic-web.com'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/SWC/1/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/SWC/1/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'AT',
            organization: 'Semantic Web Company GmbH',
            common_name:  '*.semantic-web.com'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/SWC/2']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/SWC/2/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/SWC/2/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/SWC/2/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/SWC/2/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'AT',
            organization: 'Semantic Web Company GmbH',
            common_name:  '*.semantic-web.com'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/SWC/2/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/SWC/2/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'AT',
            organization: 'Semantic Web Company GmbH',
            common_name:  '*.semantic-web.com'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/SWC/3']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/SWC/3/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/SWC/3/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/SWC/3/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/SWC/3/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'AT',
            organization: 'Semantic Web Company GmbH',
            common_name:  '*.semantic-web.com'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/SWC/3/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/SWC/3/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            country:      'AT',
            organization: 'Semantic Web Company GmbH',
            common_name:  '*.semantic-web.com'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/DUM']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/DUM/1'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/DUM/2'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/DUM/3'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/DUM/1']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/DUM/1/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/DUM/1/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/DUM/1/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/DUM/1/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            common_name: '*.example.org'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/DUM/1/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/DUM/1/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            common_name: '*.example.org'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/DUM/2']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/DUM/2/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/DUM/2/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/DUM/2/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/DUM/2/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            common_name: '*.example.org'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/DUM/2/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/DUM/2/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            common_name: '*.example.org'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/DUM/3']
    = async function (param) {
    await generators['nrd-testbed/ec/ids/cut/DBX/DUM/3/connector/client'](param);
    await generators['nrd-testbed/ec/ids/cut/DBX/DUM/3/tls-server/server'](param);
};

generators['nrd-testbed/ec/ids/cut/DBX/DUM/3/connector/client']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/DUM/3/connector/client', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            common_name: '*.example.org'
        }
    });
};

generators['nrd-testbed/ec/ids/cut/DBX/DUM/3/tls-server/server']
    = async function ({agent, config, defaults}) {
    await agent.generateClientCertificate('nrd-testbed/ec/ids/cut/DBX/DUM/3/tls-server/server', {
        ca:      'nrd-testbed/ec/ids/component/ca',
        subject: {
            common_name: '*.example.org'
        }
    });
};

Object.freeze(generators);
module.exports = generators;
