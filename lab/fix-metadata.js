const
    path         = require('path'),
    fs           = require('fs'),
    CAAgent      = require('../src/code/agent.ca.js'),
    resourceRoot = path.join(__dirname, '../resources'),
    agent        = new CAAgent({cwd: resourceRoot, verbose: true}),
    certPathes   = (function findCerts(currentFolder) {
        const children   = fs.readdirSync(currentFolder, {withFileTypes: true});
        const files      = children.filter(dirent => dirent.isFile()).map(dirent => dirent.name);
        const folders    = children.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
        const certName   = (files.find(file => file.endsWith('.cert')) || '').replace('.cert', '');
        const recResults = folders.map(folder => findCerts(path.join(currentFolder, folder)));
        if (!certName || !files.includes(certName + '.json')) return recResults.flat(1);
        return [path.join(currentFolder, certName), ...recResults.flat(1)];
    })(resourceRoot);

Promise.all(certPathes.map(file => agent.generateJsonMetadata(file))).catch(console.error);
