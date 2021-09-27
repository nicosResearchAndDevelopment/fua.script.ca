const
    _util = require('@nrd/fua.core.util'),
    util  = exports = module.exports = {
        ..._util,
        assert: _util.Assert('nrd-ca')
    };

/**
 * @param argv
 * @returns {{args: Array<string>, param: {Object}}}
 */
util.parseArgv = function (argv = process.argv) {
    const
        tmp_args     = [],
        args         = [],
        param        = {},
        RE_match_arg = /^(--?)?([0-9a-z\-_.?$]+)(?:(=)(.*))?$/i,
        cleanupValue = (val) => val.substring((val.startsWith('"') ? 1 : 0), val.length - (val.endsWith('"') ? 1 : 0));

    for (let arg of argv) {
        const res = RE_match_arg.exec(arg);
        if (res) {
            if (res[3]) {
                tmp_args.push({type: 'key', value: res[2]});
                tmp_args.push({type: 'val', value: cleanupValue(res[4])});
            } else if (res[1]) {
                tmp_args.push({type: 'key', value: res[2]});
            } else {
                tmp_args.push({type: 'val', value: cleanupValue(arg)});
            }
        } else {
            tmp_args.push({type: 'val', value: cleanupValue(arg)});
        }
    }

    for (let index = 0, max = tmp_args.length - 1; index <= max; index++) {
        if (tmp_args[index].type === 'key') {
            const
                key   = tmp_args[index].value,
                value = (index === max || tmp_args[index + 1].type !== 'val')
                    ? true : tmp_args[++index].value;
            if (!(key in param)) {
                param[key] = value;
            } else if (!util.isArray(param[key])) {
                param[key] = [param[key], value];
            } else {
                param[key].push(value);
            }
        } else {
            args.push(tmp_args[index].value);
        }
    }

    return {param, args};
}; // parseArgv

module.exports = util;
