import { Rule, RuleTester } from 'eslint';
import { layerImportsCheckerRule } from '../../../lib/rules/layer-imports-checker';
import { PluginOptions } from '../../../lib/types';

/**
 * Tests for layer imports checker rule
 */

const ruleTester = new RuleTester();

const aliasOptions: PluginOptions = {
	alias: '@',
};

ruleTester.run(
	'layer-imports-checker',
	layerImportsCheckerRule as unknown as Rule.RuleModule,
	{
		valid: [
			{
				filename: 'D:\\project-name\\src\\entities\\Article\\file.tsx',
				code: "import {someFiles} from '@/shared/ui/Button'",
				options: [aliasOptions],
			},
			{
				filename: 'D:\\project-name\\src\\entities\\Article\\file.tsx',
				code: "import {someFiles} from '@/entities/User/file.tsx'",
				options: [aliasOptions],
			},
			{
				filename:
					'D:\\project-name\\src\\features\\EditableProfileCard\\file.tsx',
				code: "import {someFiles} from '@/entities/User/file.tsx'",
				options: [aliasOptions],
			},
			{
				filename:
					'D:\\project-name\\src\\features\\EditableProfileCard\\file.tsx',
				code: "import {someFiles} from '@/shared/ui/Button'",
				options: [aliasOptions],
			},
			{
				filename: 'D:\\project-name\\src\\app\\providers\\file.tsx',
				code: "import {someFiles} from '@/features/EditableProfileCard'",
				options: [aliasOptions],
			},
			{
				filename: 'D:\\project-name\\src\\widgets\\Page\\file.tsx',
				code: "import {useLocation} from 'react-router-dom'",
				options: [aliasOptions],
			},
			{
				filename: 'D:\\project-name\\src\\index.tsx',
				code: "import {someFiles} from '@/app/providers/file.tsx'",
				options: [aliasOptions],
			},
			{
				filename:
					'D:\\Nature Projects\\HabrProduction\\src\\config\\babel\\babelRemovePropsPlugin.ts',
				code: "import {someFiles} from '@/app/providers/file.tsx'",
				options: [aliasOptions],
			},
			{
				filename: 'D:\\project-name\\src\\entities\\User\\file.tsx',
				code: "import {StateSchema} from '@/app/providers/StoreProvider'",
				options: [
					{
						alias: '@',
						ignoreImportsPatters: ['**/StoreProvider'],
					},
				],
			},
		],

		invalid: [
			{
				filename: 'D:\\project-name\\src\\entities\\Article\\file.tsx',
				code: "import {someFiles} from '@/features/editableProfileCard'",
				errors: [{ messageId: 'notAvailableImport' }],
				options: [aliasOptions],
			},
			{
				filename: 'D:\\project-name\\src\\features\\Article\\file.tsx',
				code: "import {someFiles} from '@/app/providers/StoreProvider'",
				errors: [{ messageId: 'notAvailableImport' }],
				options: [aliasOptions],
			},
			{
				filename: 'D:\\project-name\\src\\widgets\\Page\\file.tsx',
				code: "import {someFiles} from '@/pages/AboutPage'",
				errors: [{ messageId: 'notAvailableImport' }],
				options: [aliasOptions],
			},
			{
				filename: 'D:\\project-name\\src\\pages\\AboutPage\\file.tsx',
				code: "import {someFiles} from '@/app/providers/StoreProvider'",
				errors: [{ messageId: 'notAvailableImport' }],
				options: [aliasOptions],
			},
		],
	}
);
