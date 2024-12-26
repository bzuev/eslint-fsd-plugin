const path = require('path');
const {isPathRelative, removeAlias, getNormalizedCurrentFilePath} = require('../helpers')
const {layers} = require('../consts');

const RELATIVE_PATH_ERROR = 'RELATIVE_PATH_ERROR';

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'feature-sliced design relative path checker',
            recommended: false,
            url: 'docs/rules/path-checker.md',
        },
        fixable: 'code',
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

        return {
            ImportDeclaration(node) {
                try {
                    // node.source.value example: app/entities/articles/Article
    
                    const {value} = node.source;
                    const importTo = removeAlias(value, alias); // remove alias from path
    
                    // fromFilename example: D:\FULL FRONTEND КУРС\articles\Article
    
                    const fromFilename = context.getFilename();
    
                    if (shouldBeRelative(fromFilename, importTo)) {
                        context.report(
                            {
                                node, 
                                messageId: RELATIVE_PATH_ERROR,
                                fix: (fixer) => {
                                    const normalizedPath = getNormalizedCurrentFilePath(fromFilename) // entities/Article/Article.tsx
                                        .split('/')
                                        .slice(0, -1)
                                        .join('/');
                                    
                                    let relativePath = path.relative(normalizedPath, `/${importTo}`)
                                        .split('\\')
                                        .join('/');
    
                                    if (!relativePath.startsWith('.')) {
                                        relativePath = `./${relativePath}`
                                    }
    
                                    return fixer.replaceText(node.source, `'${relativePath}'`)
                                }
                            }
                        );
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        };
    },
};

function shouldBeRelative(from, to) {
    if (isPathRelative(to)) {
        return false;
    }

    const arrayFromImportPath = to.split('/'); // [entities, Article]
    const importLayerName = arrayFromImportPath[0]; // entities
    const importSliceName = arrayFromImportPath[1]; // Article

    if (!importLayerName || !importSliceName || !layers[importLayerName]) {
        return false;
    }
    
    const currentFilePath = getNormalizedCurrentFilePath(from);
    const arrayFromCurrentFilePath = currentFilePath?.split('/');

    const currentLayerName = arrayFromCurrentFilePath[1];
    const currentSliceName = arrayFromCurrentFilePath[2];

    if (!currentLayerName || !currentSliceName || !layers[currentLayerName]) {
        return false;
    }

    return currentSliceName === importSliceName && importLayerName === currentLayerName;
}

