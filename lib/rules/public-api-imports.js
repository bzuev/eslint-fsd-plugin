const {isPathRelative} = require("../helpers")
const micromatch = require('micromatch');

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "desc",
      recommended: false,
      url: 'docs/rules/public-api-imports.md',
    },
    fixable: null, // Or `code` or `whitespace`
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

    const checkingLayers = {
      'entities': 'entities',
      'features': 'features',
      'widgets': 'widgets',
      'pages': 'pages',
    }

    return {
      ImportDeclaration(node) {
        const value = node.source.value;
        const importTo = alias ? value.replace(`${alias}/`, '') : value;

        if (isPathRelative(importTo)) {
          return;
        }

        const segments = importTo.split('/'); // [entities, Article, model, types]
        const layer = segments[0]; 

        if (!checkingLayers[layer]) {
          return;
        }

        const isImportNotFromPublicApi = segments.length > 2;
        // [entities, Article, testing]
        const isTestingPublicApi = segments[2] === 'testing' &&  segments.length < 4 

        if (isImportNotFromPublicApi && !isTestingPublicApi) {
          context.report({node, message: 'Абсолютный импорт разрешен только из Public API (index.ts)'});
        }

        if (isTestingPublicApi) {
          const currentFilePath = context.getFilename();

          const isCurrentFileTesting = testFilesPatterns.some(pattern => micromatch.isMatch(currentFilePath, pattern));

          if (!isCurrentFileTesting) {
            context.report({node, message: 'Тестовые данные необходимо импортировать только из PublicApi (testing.ts)'});
          }
        }
      }
    };
  },
};


