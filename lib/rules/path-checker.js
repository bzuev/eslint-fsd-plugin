"use strict";

const path = require("path");

module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "feature-sliced design relative path checker",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        // app/entities/articles/Article
        const importTo = node.source.value;

        // D:\FULL FRONTEND КУРС\articles\/Article
        const fromFilename = context.getFilename();

        if (shouldBeRelative(fromFilename, importTo)) {
          context.report({node: node, message: 'В рамках одного слайса все пути должны быть относительными'});
        }
      }
    };
  },
};

function isPathRelative(path) {
  return path === '.' || path.startsWith('./') || path.startsWith('../');
}

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
  const projectFrom = normalizedPath.split('src')[1]; //articles\/Article
  const fromArray = projectFrom.split('\\');

  const fromLayer = fromArray[1];
  const fromSlice = fromArray[2];

  if (!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false;
  }

  return fromSlice === toSlice && toLayer === fromLayer;
}

