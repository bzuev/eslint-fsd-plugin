import path from 'path';
import {
	isPathRelative,
	removeAlias,
	getNormalizedCurrentFilePath,
	isFsdImportLayer,
	isFsdLayer,
	docsUrl,
} from '../helpers';
import { PluginOptions } from '../types';
import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(docsUrl);

export const pathCheckerRule = createRule<
	Pick<PluginOptions, 'alias'>[],
	'relativePathError'
>({
	name: 'path-checker',
	meta: {
		type: 'problem',
		docs: {
			description: 'feature-sliced design relative path checker',
		},
		fixable: 'code',
		messages: {
			relativePathError:
				'В рамках одного слайса все пути должны быть относительными',
		},
		schema: [
			{
				type: 'object',
				properties: {
					alias: { type: 'string' },
				},
				additionalProperties: false,
			},
		],
	},
	defaultOptions: [{}],
	create(context, [options]) {
		const alias = options?.alias ?? '';

		return {
			ImportDeclaration(node: TSESTree.ImportDeclaration) {
				try {
					/* node.source.value example: app/entities/articles/Article */
					const source = node.source.value;
					if (typeof source !== 'string') return;

					const importTo = removeAlias(source, alias);

					/* Example: C:/project/src/entities/Article */
					const fromFilename = context.filename;

					if (shouldBeRelative(fromFilename, importTo)) {
						context.report({
							node,
							messageId: 'relativePathError',
							fix: fixer => {
								const normalizedPath = excludeLayerWithSlicePath(
									getNormalizedCurrentFilePath(fromFilename)
								);

								let relativePath = path
									.relative(normalizedPath, `/${importTo}`)
									.split('\\')
									.join('/');

								if (!relativePath.startsWith('.')) {
									relativePath = `./${relativePath}`;
								}

								return fixer.replaceText(node.source, `'${relativePath}'`);
							},
						});
					}
				} catch (error) {
					console.log(error);
				}
			},
		};
	},
});

function shouldBeRelative(from: string, to: string) {
	// if relative path - skip
	if (isPathRelative(to)) {
		return false;
	}

	const arrayFromImportPath = to.split('/'); // [entities, Article]
	const importLayerName = arrayFromImportPath[0]; // entities
	const importSliceName = arrayFromImportPath[1]; // Article

	// if import layer or slice not found - skip
	if (!importLayerName || !importSliceName) {
		return false;
	}

	// if import layer is not fsd import layer - skip
	if (!isFsdImportLayer(importLayerName)) {
		return false;
	}

	const currentFilePath = getNormalizedCurrentFilePath(from);
	const arrayFromCurrentFilePath = currentFilePath.split('/');

	const currentLayerName = arrayFromCurrentFilePath[1];
	const currentSliceName = arrayFromCurrentFilePath[2];

	// if current file layer or slice not found - skip
	if (!currentLayerName || !currentSliceName) {
		return false;
	}

	// if current file layer is not fsd layer - skip
	if (!isFsdLayer(currentLayerName)) {
		return false;
	}

	return (
		currentSliceName === importSliceName && importLayerName === currentLayerName
	);
}

function excludeLayerWithSlicePath(path: string) {
	return path.split('/').slice(0, -1).join('/');
}
