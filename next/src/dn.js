const
    DN      = exports,
    assert  = require('@fua/core.assert'),
    objects = require('@fua/core.objects'),
    is      = require('@fua/core.is');

/**
 * @see https://www.rfc-editor.org/rfc/rfc5280#section-4.1.2.4
 * @see https://docs.oracle.com/cd/E24191_01/common/tutorials/authz_cert_attributes.html
 * @see https://www.ibm.com/docs/en/ibm-mq/7.5?topic=certificates-distinguished-names
 * @see https://www.cryptosys.net/pki/manpki/pki_distnames.html
 * @type {Record<string, string>}
 */
DN.attributes = {
    // country
    // C: CountryName
    // C	Country
    // C	countryName	2.5.4.6
    c:           'C',
    country:     'C',
    countryname: 'C',

    // organization
    // O: Organization
    // O	Organization name
    // O	organizationName	2.5.4.10
    o:                'O',
    organization:     'O',
    organizationname: 'O',

    // organizational unit
    // OU: OrganizationalUnit
    // OU	Organizational Unit name
    // OU	organizationalUnit	2.5.4.11
    ou:                     'OU',
    organizationalunit:     'OU',
    organizationalunitname: 'OU',

    // distinguished name qualifier
    // DNQ	Distinguished name qualifier
    dnq:                        'DNQ',
    distinguishednamequalifier: 'DNQ',

    // state or province name
    // S: StateOrProvinceName
    // ST (or SP or S)	State or Province name
    // ST or S	stateOrProvinceName	2.5.4.8
    s:                   'ST',
    st:                  'ST',
    state:               'ST',
    statename:           'ST',
    province:            'ST',
    provincename:        'ST',
    stateorprovince:     'ST',
    stateorprovincename: 'ST',

    // common name (e.g., "Susan Housley")
    // CN: CommonName
    // CN	Common Name
    // CN	commonName	2.5.4.3
    cn:         'CN',
    commonname: 'CN',

    // serial number
    // SERIALNUMBER	Certificate serial number
    // SERIALNUMBER	serialNumber	2.5.4.5
    serialnumber: 'SERIALNUMBER',

    // locality
    // L: Locality
    // L	Locality name
    // L	localityName	2.5.4.7
    l:            'L',
    locality:     'L',
    localityname: 'L',

    // title
    // T	Title
    // T or TITLE	title	2.5.4.12
    t:     'T',
    title: 'T',

    // surname
    // SN	surname	2.5.4.4
    sn:      'SN',
    surname: 'SN',

    // given name
    // G or GN	givenName	2.5.4.42
    gn:        'GN',
    givenname: 'GN',

    // initials

    // pseudonym

    // generation qualifier (e.g., "Jr.", "3rd", or "IV")

    // MAIL	Email address
    // E	Email address (Deprecated in preference to MAIL)
    // E	emailAddress (deprecated)	1.2.840.113549.1.9.1
    e:     'MAIL',
    mail:  'MAIL',
    email: 'MAIL',

    // UID or USERID	User identifier
    // UID	userID	0.9.2342.19200300.100.1.1
    uid:    'UID',
    userid: 'UID',

    // DC	Domain component
    // DC	domainComponent	0.9.2342.19200300.100.1.25
    dc:              'DC',
    domaincomponent: 'DC',

    // STREET	Street / First line of address
    // STREET	streetAddress	2.5.4.9
    street: 'STREET',

    // PC	Postal code / zip code
    pc:         'PC',
    postalcode: 'PC',

    // UNSTRUCTUREDNAME	Host name
    unstructuredname: 'UNSTRUCTUREDNAME',
    hostname:         'UNSTRUCTUREDNAME',

    // UNSTRUCTUREDADDRESS	IP address
    unstructuredaddress: 'UNSTRUCTUREDADDRESS',
    ipaddress:           'UNSTRUCTUREDADDRESS'
};

/**
 * @type {Record<string, Array<string>>}
 */
DN.identifiers = Object.entries(DN.attributes).reduce((result, [key, value]) => (result[value] ??= []).push(key) && result, {});

/**
 * @param {string} id
 * @returns {boolean}
 */
DN.isIdentifier = function (id) {
    return is.string(id) && (id in DN.identifiers);
};

/**
 * @param {string} attr
 * @returns {string | null}
 */
DN.getIdentifier = function (attr) {
    if (!is.string(attr)) return null;
    const normAttr = attr.toLowerCase().replace(/[-_]/g, '');
    return DN.attributes[normAttr] || null;
};

/**
 * @param {{[key: string]: string | Array<string>}} dnObj
 * @returns {string}
 */
DN.serialize = function (dnObj) {
    assert.object(dnObj, is.validator.alternative([is.string, is.array.strings]));
    return Object.entries(dnObj).map(([attr, value]) => {
        const id = DN.getIdentifier(attr);
        assert(id, 'unknown attribute: ' + attr);
        return is.array(value)
            ? value.map(val => '/' + id + '=' + val).join('')
            : '/' + id + '=' + value;
    }).join('');
};

DN.pattern = /^(?:\/[A-Z]+=[^/=\n]*)*$/;

/**
 * @param {string} dn
 * @returns {{[key: string]: string | Array<string>}}
 */
DN.parse = function (dn) {
    assert.string(dn, DN.pattern);
    return dn.substring(1).split('/').reduce((result, entry) => {
        const [id, value] = entry.split('=');
        assert(DN.isIdentifier(id), 'unknown identifier: ' + id);
        if (is.string(result[id])) result[id] = [result[id], value];
        else if (is.array(result[id])) result[id].push(value);
        else result[id] = value;
        return result;
    }, {});
};

objects.freeze.recursive(DN);
