import { Rule, RuleTester } from 'eslint';
import { pathCheckerRule } from '../../../lib/rules/path-checker';
import { PluginOptions } from '../../../lib/types';

/**
 * Tests for path checker rule
 */

const ruleTester = new RuleTester();

const aliasOptions: PluginOptions = {
	alias: '@',
};

ruleTester.run('path-checker', pathCheckerRule as unknown as Rule.RuleModule, {
	valid: [
		{
			filename: 'D:\\project-name\\src\\entities\\Article',
			code: "import { RatingCard } from '../../model/slice/index.ts';",
		},
		{
			filename: 'D:\\project-name\\config\\file.ts',
			code: "import { testFile } from './test';",
		},
	],

	invalid: [
		{
			filename:
				'D:\\project-name\\src\\entities\\Article\\ui\\ArticleList\\file.tsx',
			code: "import {ArticleBlockType} from '@/entities/Article/model/consts/articleConsts'",
			errors: [{ messageId: 'relativePathError' }],
			options: [aliasOptions],
			output:
				"import {ArticleBlockType} from '../../model/consts/articleConsts'",
		},
		{
			filename:
				'D:\\project-name\\src\\entities\\Article\\ui\\ArticleList\\file.tsx',
			code: "import css from '@/entities/Article/ui/ArticleList/ArticleList.module.scss'",
			errors: [{ messageId: 'relativePathError' }],
			options: [aliasOptions],
			output: "import css from './ArticleList.module.scss'",
		},
		{
			filename:
				'D:\\project-name\\src\\pages\\ArticlesPage\\ui\\ArticlesPage\\file.tsx',
			code: "import {ArticlesPageFilters} from '@/pages/ArticlesPage/ui/ArticlesPageFilters/ArticlesPageFilters';",
			errors: [{ messageId: 'relativePathError' }],
			options: [aliasOptions],
			output:
				"import {ArticlesPageFilters} from '../ArticlesPageFilters/ArticlesPageFilters';",
		},
	],
});
