import micromatch from 'micromatch';
import {
	isPathRelative,
	getNormalizedCurrentFilePath,
	removeAlias,
	isFsdLayer,
	docsUrl,
} from '../helpers';
import { FsdLayer, PluginOptions } from '../types';
import { fsdLayerImportMap } from '../consts';
import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(docsUrl);

export const layerImportsCheckerRule = createRule<
	Pick<PluginOptions, 'alias' | 'ignoreImportsPatters'>[],
	'notAvailableImport'
>({
	name: 'layer-imports-checker',
	meta: {
		type: 'problem',
		docs: {
			description: 'FSD layers imports checker',
		},
		messages: {
			notAvailableImport:
				'Данный слой может импортировать в себя только нижележащие слои: {{ layers }}',
		},
		schema: [
			{
				type: 'object',
				properties: {
					alias: {
						type: 'string',
					},
					ignoreImportsPatters: {
						type: 'array',
					},
				},
			},
		],
	},
	defaultOptions: [{}],
	create(context, [options]) {
		const { alias = '', ignoreImportsPatters = [] } = options ?? {};

		const getCurrentFileLayer = (): FsdLayer | null => {
			const currentFilePath = context.filename; // C:/project/src/entities/Article

			const projectPath = getNormalizedCurrentFilePath(currentFilePath);
			const layer = projectPath.split('/')[1] || '';

			if (!isFsdLayer(layer)) return null;

			return layer as FsdLayer;
		};

		const getImportLayer = (value: string): FsdLayer | null => {
			const importPath = removeAlias(value, alias);
			const layer = importPath.split('/')[0] || '';

			if (!isFsdLayer(layer)) return null;

			return layer as FsdLayer;
		};

		return {
			ImportDeclaration(node) {
				const importPath = node.source.value as string; // @/entities/articles/Article

				const currentFileLayer = getCurrentFileLayer();
				const importLayer = getImportLayer(importPath);

				// if current file or import outside of fsd layers - skip
				if (!currentFileLayer || !importLayer) {
					return;
				}

				// if relative path - skip
				if (isPathRelative(importLayer)) {
					return;
				}

				const isIgnored = ignoreImportsPatters.some(pattern =>
					micromatch.isMatch(importPath, pattern)
				);

				// if import is ignored - skip
				if (isIgnored) {
					return;
				}

				const availableLayers = fsdLayerImportMap[currentFileLayer];

				if (!availableLayers.includes(importLayer)) {
					context.report({
						node,
						messageId: 'notAvailableImport',
						data: {
							layers: fsdLayerImportMap[currentFileLayer].join(', '),
						},
					});
				}
			},
		};
	},
});
