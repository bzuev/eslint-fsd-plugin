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
				code: "import { types } from '@/entities/Article'",
			},
			{
				code: "import { types } from 'entities/Article'",
			},
			{
				code: "import { types } from '../../Article'",
			},
			{
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
		],

		invalid: [
			{
				code: "import { types } from '@/entities/Article/model/types'",
				errors: [{ messageId: 'publicApiError' }],
				options: [aliasOptions],
				output: "import { types } from '@/entities/Article'",
			},
			{
				code: "import { types } from 'entities/Article/model/types'",
				errors: [{ messageId: 'publicApiError' }],
				options: [aliasOptions],
				output: "import { types } from '@/entities/Article'",
			},
			{
				filename:
					'D:\\project-name\\src\\entities\\Article\\StoreDecorator.tsx',
				code: "import {someFiles} from '@/entities/Article/testing/file.tsx'",
				errors: [{ messageId: 'publicApiError' }],
				options: [
					{
						alias: '@',
						testFilesPatterns: [
							'**/*.test.*',
							'**/*.stories.*',
							'**/StoreDecorator.tsx',
						],
					},
				],
				output: "import {someFiles} from '@/entities/Article'",
			},
			{
				filename: 'D:\\project-name\\src\\entities\\Article\\article.ts',
				code: "import {someFiles} from '@/entities/Article/testing'",
				errors: [{ messageId: 'testingPublicApiError' }],
				options: [
					{
						alias: '@',
						testFilesPatterns: [
							'**/*.test.*',
							'**/*.stories.*',
							'**/StoreDecorator.tsx',
						],
					},
				],
			},
		],
	}
);
