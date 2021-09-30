const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    path             = require('path'),
    CAAgent          = require('../src/code/agent.ca.js');

describe('ca', function () {

    let agent;
    before('construct CAAgent', function () {
        agent = new CAAgent({
            cwd:     path.join(__dirname, '../resources'),
            verbose: false
        });
    });

    test('create a temp/client cert', async function () {
        await agent.generateClientCertificate('temp/client', {ca: 'root/ca'});
    });

});
