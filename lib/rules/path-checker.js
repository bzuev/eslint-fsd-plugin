const path = require('path');
const {isPathRelative} = require('../helpers')

const RELATIVE_PATH_ERROR = 'RELATIVE_PATH_ERROR';

module.exports = {
    meta: {
        type: 'problem', // `problem`, `suggestion`, or `layout`
        docs: {
            description: 'feature-sliced design relative path checker',
            recommended: false,
            url: 'docs/rules/path-checker.md', // URL to the documentation page for this rule
        },
        fixable: 'code', // Or `code` or `whitespace`
        messages: {
            [RELATIVE_PATH_ERROR]: 'В рамках одного слайса все пути должны быть относительными'
        },
        schema: [
            {
                type: 'object',
                properties: {
                    alias: {
                        type: 'string',
                    }
                }
            }
        ],
    },

    create(context) {
        const alias = context.options[0]?.alias || '';

        const getRelativePath = (currentPath, absolutePath) => {
            const currentFileDirName = path.dirname(currentPath);
            const sourceCurrentPath = currentFileDirName.split('src')[1].replace(/\\/g, '/');
            const sourceAbsolutePath = `/${absolutePath}`

            let relativePath = path.relative(sourceCurrentPath, sourceAbsolutePath);

            if (!relativePath.startsWith('.')) {
                relativePath = `./${relativePath}`
            }

            return relativePath.replace(/\\/g, '/');
        }

        return {
            ImportDeclaration(node) {
                // app/entities/articles/Article

                const {value} = node.source;
                const importTo = alias ? value.replace(`${alias}/`, '') : value;

                // D:\FULL FRONTEND КУРС\articles\/Article
                const fromFilename = context.getFilename();

                if (shouldBeRelative(fromFilename, importTo)) {
                    context.report(
                        {
                            node, 
                            messageId: RELATIVE_PATH_ERROR,
                            fix: (fixer) => fixer.replaceText(node.source, `'${getRelativePath(fromFilename, importTo)}'`)
                        }
                    );
                }
            }
        };
    },
};

const layers = {
    'entities': 'entities',
    'features': 'features',
    'widgets': 'widgets',
    'pages': 'pages',
    'shared': 'shared',
}

function shouldBeRelative(from, to) {
    if (isPathRelative(to)) {
        return false;
    }

    // entities/Article
    const toArray = to.split('/');
    const toLayer = toArray[0]; // entities
    const toSlice = toArray[1]; // Article

    if (!toLayer || !toSlice || !layers[toLayer]) {
        return false;
    }

    // D:\FULL FRONTEND КУРС\src\entities\/Article
    const normalizedPath = path.toNamespacedPath(from);
    const projectFrom = normalizedPath.split('src')[1]; // articles\/Article
    const fromArray = projectFrom.split('\\');

    const fromLayer = fromArray[1];
    const fromSlice = fromArray[2];

    if (!fromLayer || !fromSlice || !layers[fromLayer]) {
        return false;
    }

    return fromSlice === toSlice && toLayer === fromLayer;
}

