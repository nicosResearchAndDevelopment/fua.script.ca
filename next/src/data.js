const
    Data    = exports,
    assert  = require('@fua/core.assert'),
    objects = require('@fua/core.objects'),
    is      = require('@fua/core.is');

// TODO add functions to organize files in data here
// TODO also add data caching to prevent leftover files on failed executions

objects.freeze.recursive(Data);
