const micromatch = require('micromatch');
const {isPathRelative, removeAlias} = require('../helpers');
const {layers} = require('../consts');

const PUBLIC_ERROR = 'PUBLIC_ERROR';
const TESTING_PUBLIC_ERROR = 'TESTING_PUBLIC_ERROR';

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'desc',
            recommended: false,
            url: 'docs/rules/public-api-imports.md',
        },
        fixable: 'code',
        messages: {
            [PUBLIC_ERROR]: 'Абсолютный импорт разрешен только из Public API (index.ts)',
            [TESTING_PUBLIC_ERROR]: 'Тестовые данные необходимо импортировать только из PublicApi (testing.ts)'
        },
        schema: [
            {
                type: 'object',
                properties: {
                    alias: {
                        type: 'string',
                    },
                    testFilesPatterns: {
                        type: 'array',
                    }
                }
            }
        ],
    },

    create(context) {
        const {alias = '', testFilesPatterns = []} = context.options[0] ?? {};

        const checkingLayers = {...layers};
        delete checkingLayers.shared;

        return {
            ImportDeclaration(node) {
                const {value} = node.source;
                const importTo = removeAlias(value, alias); // remove alias from path

                if (isPathRelative(importTo)) {
                    return;
                }

                const segments = importTo.split('/'); // [entities, Article, model, types]
                const layer = segments[0]; 
                const slice= segments[1]; 

                if (!checkingLayers[layer]) {
                    return;
                }

                const isImportNotFromPublicApi = segments.length > 2;

                // [entities, Article, testing]
                const isTestingPublicApi = segments[2] === 'testing' &&  segments.length < 4 

                if (isImportNotFromPublicApi && !isTestingPublicApi) {
                    context.report(
                        {
                            node, 
                            messageId: PUBLIC_ERROR, 
                            fix: (fixer) => fixer.replaceText(node.source, `'${alias}/${layer}/${slice}'`)
                        }
                    );
                }

                if (isTestingPublicApi) {
                    const currentFilePath = context.getFilename();

                    const isCurrentFileTesting = testFilesPatterns
                        .some(pattern => micromatch.isMatch(currentFilePath, pattern));

                    if (!isCurrentFileTesting) {
                        context.report({node, messageId: TESTING_PUBLIC_ERROR});
                    }
                }
            }
        };
    },
};


