const
    util          = require('@nrd/fua.core.util'),
    child_process = require('child_process'),
    verbose       = false,
    proc          = exports;

/**
 * @param {...(string | number | Array<string | number> | {[key: string | number]: boolean | string | number | Array<string | number> })} args
 * @returns {Array<string>}
 */
proc.flattenArgs = function (args) {
    if (util.isArray(args)) {
        return args.map(proc.flattenArgs).filter(val => val).flat(1);
    } else if (util.isObject(args)) {
        const result = [];
        for (let [key, value] of Object.entries(args)) {
            key = util.isNumber(key) ? '--' + key
                : key.startsWith('-') ? key
                    : key.length > 1 ? '--' + key
                        : '-' + key;
            if (util.isArray(value)) {
                for (let entry of value) {
                    if (util.isString(value)) {
                        result.push(key);
                        result.push(entry);
                    } else if (util.isNumber(value)) {
                        result.push(key);
                        result.push('' + entry);
                    }
                }
            } else if (util.isString(value)) {
                result.push(key);
                result.push(value);
            } else if (util.isNumber(value)) {
                result.push(key);
                result.push('' + value);
            } else if (value === true) {
                result.push(key);
            }
        }
        return result;
    } else if (util.isString(args)) {
        return [args];
    } else if (util.isNumber(args)) {
        return ['' + args];
    }
}; // flattenArgs

/**
 * @param argv
 * @returns {{args: Array<string>, param: {Object}}}
 */
proc.parseArgv = function (argv = process.argv) {
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

proc.nodeEnvArgs = function () {
    const {param, args} = proc.parseArgv();
    return {
        exe:    args.shift(),
        script: args.shift(),
        param,
        args,
        env:    process.env,
        cwd:    process.cwd(),
        prod:   process.env.NODE_ENV === 'productive'
    };
}; // nodeEnvArgs

/**
 * @param {string} cwd
 * @param {string} exe
 * @param {...(string | Array<string> | {[key: string]: string | Array<string>})} args
 * @returns {Promise<string>}
 */
proc.execProcess = async function (cwd, exe, ...args) {
    debugger;
    const subprocess = child_process.spawn(exe, proc.flattenArgs(args), {cwd});
    verbose && process.stdout.write('$ ' + cwd + '> ' + subprocess.spawnargs.join(' ') + '\n');
    let stdout = '', stderr = '';
    subprocess.stdout.on('data', (data) => (stdout += data) && verbose && process.stdout.write(data));
    subprocess.stderr.on('data', (data) => (stderr += data) && verbose && process.stderr.write(data));
    const exitCode = await new Promise((resolve) => subprocess.on('close', resolve));
    if (exitCode !== 0) throw new Error(stderr);
    return stdout || stderr;
}; // execProcess

module.exports = proc;
