const path = require('path');

function isPathRelative(currentPath) {
    return currentPath === '.' || currentPath.startsWith('./') || currentPath.startsWith('../');
}

function removeAlias(value, alias) {
    return alias ? value.replace(`${alias}/`, '') : value;
}

function getNormalizedCurrentFilePath(currentFilePath) {
    const normalizedPath = path.toNamespacedPath(currentFilePath);
    const projectFrom = normalizedPath.split('src')[1];

    return projectFrom.split('\\').join('/');
}

module.exports = {
    isPathRelative,
    removeAlias,
    getNormalizedCurrentFilePath
}