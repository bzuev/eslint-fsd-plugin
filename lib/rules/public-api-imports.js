const {isPathRelative} = require("../helpers")

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
          }
        }
      }
    ],
  },

  create(context) {
    const alias = context.options[0]?.alias || '';

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

        if (isImportNotFromPublicApi) {
          context.report({node, message: 'Абсолютный импорт разрешен только из Public API (index.ts)'});
        }
      }
    };
  },
};


