import micromatch from 'micromatch';
import {
	docsUrl,
	isFsdPublicApiLayer,
	isPathRelative,
	removeAlias,
} from '../helpers';
import { PluginOptions } from '../types';
import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(docsUrl);

export const publicApiImportsCheckerRule = createRule<
	Pick<PluginOptions, 'alias' | 'testFilesPatterns'>[],
	'publicApiError' | 'testingPublicApiError'
>({
	name: 'public-api-imports-checker',
	meta: {
		type: 'problem',
		docs: {
			description: 'desc',
		},
		fixable: 'code',
		messages: {
			publicApiError:
				'Абсолютный импорт разрешен только из Public API (index.ts)',
			testingPublicApiError:
				'Тестовые данные необходимо импортировать только из PublicApi (testing.ts)',
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
					},
				},
			},
		],
	},
	defaultOptions: [{}],
	create(context) {
		const options: PluginOptions = context.options[0] ?? {};
		const { alias = '', testFilesPatterns = [] } = options;

		return {
			ImportDeclaration(node) {
				const source = node.source.value as string;
				const importTo = removeAlias(source, alias);

				// if relative path - skip
				if (isPathRelative(importTo)) {
					return;
				}

				const segments = importTo.split('/'); // [entities, Article, model, types]
				const layer = segments[0];
				const slice = segments[1];

				// if current file layer or slice not found - skip
				if (!layer || !slice) {
					return;
				}

				// if current file layer is not fsd public api layer - skip
				if (!isFsdPublicApiLayer(layer)) {
					return;
				}

				const isImportNotFromPublicApi = segments.length > 2;
				const isTestingPublicApi =
					segments[2] === 'testing' && segments.length < 4;

				if (isImportNotFromPublicApi && !isTestingPublicApi) {
					context.report({
						node,
						messageId: 'publicApiError',
						fix: fixer =>
							fixer.replaceText(node.source, `'${alias}/${layer}/${slice}'`),
					});
				}

				if (isTestingPublicApi) {
					const currentFilePath = context.filename;

					const isCurrentFileTesting = testFilesPatterns.some(pattern =>
						micromatch.isMatch(currentFilePath, pattern)
					);

					if (!isCurrentFileTesting) {
						context.report({ node, messageId: 'testingPublicApiError' });
					}
				}
			},
		};
	},
});
