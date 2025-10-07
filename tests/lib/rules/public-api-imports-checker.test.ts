import { Rule, RuleTester } from 'eslint';
import { publicApiImportsCheckerRule } from '../../../lib/rules/public-api-imports-checker';

/**
 * Tests for public api imports checker
 */

const ruleTester = new RuleTester();

const aliasOptions = {
	alias: '@',
};

ruleTester.run(
	'public-api-imports',
	publicApiImportsCheckerRule as unknown as Rule.RuleModule,
	{
		valid: [
			{
				name: 'Valid case with alias',
				code: "import { types } from '@/entities/Article'",
			},
			{
				name: 'Valid case without alias',
				code: "import { types } from 'entities/Article'",
			},
			{
				name: 'Valid case with relative path',
				code: "import { types } from '../../Article'",
			},
			{
				name: 'Valid case with testing imports provided in testFilesPatterns',
				filename: 'D:\\project-name\\src\\entities\\Article\\file.test.ts',
				code: "import {someFiles} from '@/entities/Article/testing'",
				options: [
					{
						...aliasOptions,
						testFilesPatterns: [
							'**/*.test.*',
							'**/*.stories.*',
							'**/StoreDecorator.tsx',
						],
					},
				],
			},
			{
				name: 'Valid case with specific imports provided in testFilesPatterns',
				filename:
					'D:\\project-name\\src\\entities\\Article\\StoreDecorator.tsx',
				code: "import {someFiles} from '@/entities/Article/testing'",
				options: [
					{
						...aliasOptions,
						testFilesPatterns: [
							'**/*.test.*',
							'**/*.stories.*',
							'**/StoreDecorator.tsx',
						],
					},
				],
			},
			{
				name: 'Valid case with custom depth for layer',
				filename: 'D:\\project-name\\src\\widgets\\Widget\\Widget.tsx',
				code: "import {someFiles} from '@/features/Article/ArticleSwitch'",
				options: [
					{
						...aliasOptions,
						allowedDepthByLayer: { features: 3 },
					},
				],
			},
		],

		invalid: [
			{
				name: 'Invalid case with no public api import (with alias)',
				code: "import { types } from '@/entities/Article/model/types'",
				errors: [{ messageId: 'publicApiError' }],
				options: [aliasOptions],
				output: "import { types } from '@/entities/Article'",
			},
			{
				name: 'Invalid case with no public api import (no alias)',
				code: "import { types } from 'entities/Article/model/types'",
				errors: [{ messageId: 'publicApiError' }],
				options: [aliasOptions],
				output: "import { types } from '@/entities/Article'",
			},
			{
				name: 'Invalid case without custom depth for layer',
				code: "import { types } from '@/features/Article/ArticleSwitch'",
				errors: [{ messageId: 'publicApiError' }],
				options: [{ ...aliasOptions }],
				output: "import { types } from '@/features/Article'",
			},
			{
				name: 'Invalid case with custom depth for layer',
				code: "import { types } from '@/features/Article/ArticleSwitch/types'",
				errors: [{ messageId: 'publicApiError' }],
				options: [
					{
						...aliasOptions,
						allowedDepthByLayer: { features: 3 },
					},
				],
				output: "import { types } from '@/features/Article/ArticleSwitch'",
			},
		],
	}
);
