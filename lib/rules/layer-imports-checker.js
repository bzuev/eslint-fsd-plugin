const { isPathRelative } = require("../helpers");
const path = require("path");
const micromatch = require('micromatch');

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "desc",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
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
      const currentFilePath = context.getFilename();  // D:/FULL FRONTEND КУРС/src/entities/Article

      const normalizedPath = path.toNamespacedPath(currentFilePath);
      const projectPath = normalizedPath.split('src')[1]; // articles/Article/index.ts
      const segments = projectPath.split('\\');

      return segments?.[1];
    }

    const getImportLayer = (value) => {
      const importPath = alias ? value.replace(`${alias}/`, '') : value;
      const segments = importPath.split('/');

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

        const isIgnored = ignoreImportsPatters.some(pattern => {
          return micromatch.isMatch(importPath, pattern);
        })

        if (isIgnored) {
          return;
        }

        if (!layers[currentFileLayer]?.includes(importLayer)) {
          context.report(
            {
              node: node, 
              message: `Данный слой может импортировать в себя только нижележащие слои: ${layers[currentFileLayer]?.join(', ')}`
            }
          );
        }
      }
    };
  },
};
