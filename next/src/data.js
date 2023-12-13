const
    Data    = exports,
    assert  = require('@nrd/fua.core.assert'),
    objects = require('@nrd/fua.core.objects'),
    is      = require('@nrd/fua.core.is');

// TODO add functions to organize files in data here
// TODO also add data caching to prevent leftover files on failed executions

objects.freeze.recursive(Data);
