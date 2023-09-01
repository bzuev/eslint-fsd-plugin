const micromatch = require('micromatch');
const { isPathRelative, getNormalizedCurrentFilePath, removeAlias } = require('../helpers');

const NOT_AVAILABLE_IMPORT = 'NOT_AVAILABLE_IMPORT';

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'desc',
            recommended: false,
            url: null,
        },
        fixable: null,
        messages: {
            [NOT_AVAILABLE_IMPORT]: 'Данный слой может импортировать в себя только нижележащие слои: {{ layers }}'
        },
        schema: [
            {
                type: 'object',
                properties: {
                    alias: {
                        type: 'string',
                    },
                    ignoreImportsPatters: {
                        type: 'array'
                    }
                }
            }
        ],
    },

    create(context) {
        const availibleLayers = {
            'app': 'app',
            'entities': 'entities',
            'features': 'features',
            'widgets': 'widgets',
            'pages': 'pages',
            'shared': 'shared',
        }

        const layers = {
            'app': ['pages', 'widgets', 'features', 'entities', 'shared'],
            'pages': ['widgets', 'features', 'entities', 'shared'],
            'widgets': ['features', 'entities', 'shared'],
            'features': ['entities', 'shared'],
            'entities': ['entities', 'shared'],
            'shared': ['shared'],
        }

        const {alias = '', ignoreImportsPatters = []} = context.options[0] ?? {};

        const getCurrentFileLayer = () => {
            // D:/FULL FRONTEND КУРС/src/entities/Article
            const currentFilePath = context.getFilename();  

            const projectPath = getNormalizedCurrentFilePath(currentFilePath);
            const segments = projectPath?.split('/');

            return segments?.[1];
        }

        const getImportLayer = (value) => {
            const importPath = removeAlias(value, alias);
            const segments = importPath?.split('/');

            return segments?.[0];
        }
    
        return {
            ImportDeclaration(node) {
                const importPath = node.source.value; // @/entities/articles/Article 

                const currentFileLayer = getCurrentFileLayer();
                const importLayer = getImportLayer(importPath);

                if (isPathRelative(importLayer)) {
                    return;
                }
        
                if (!availibleLayers[importLayer] || !availibleLayers[currentFileLayer]) {
                    return;
                }

                const isIgnored = ignoreImportsPatters
                    .some(pattern => micromatch.isMatch(importPath, pattern))

                if (isIgnored) {
                    return;
                }

                if (!layers[currentFileLayer]?.includes(importLayer)) {
                    context.report(
                        {
                            node, 
                            messageId: NOT_AVAILABLE_IMPORT,
                            data: {
                                layers: layers[currentFileLayer]?.join(', ')
                            }
                        }
                    );
                }
            }
        };
    },
};
