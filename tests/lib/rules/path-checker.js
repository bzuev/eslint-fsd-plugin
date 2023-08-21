/**
 * @fileoverview feature-sliced design relative path checker
 * @author Ivan
 */



//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const {RuleTester} = require('eslint');
const rule = require('../../../lib/rules/path-checker');


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});

ruleTester.run('path-checker', rule, {
    valid: [
        {
            filename: 'D:\\FULL FRONTEND КУРС\\src\\entities\\Article',
            code: 'import { RatingCard } from \'../../model/slice/index.ts\';',
            errors: [],
        },
    ],

    invalid: [
        {
            filename: 'D:\\Nature Projects\\HabrProduction\\src\\entities\\Article\\ui\\ArticleList\\file.tsx',
            code: 'import {ArticleBlockType} from \'@/entities/Article/model/consts/articleConsts\'',
            errors: [{messageId: 'RELATIVE_PATH_ERROR'}],
            options: [{
                alias: '@'
            }],
            output: 'import {ArticleBlockType} from \'../../model/consts/articleConsts\''
        },
        {
            filename: 'D:\\Nature Projects\\HabrProduction\\src\\entities\\Article\\ui\\ArticleList\\file.tsx',
            code: 'import css from \'@/entities/Article/ui/ArticleList/ArticleList.module.scss\'',
            errors: [{messageId: 'RELATIVE_PATH_ERROR'}],
            options: [{
                alias: '@'
            }],
            output: 'import css from \'./ArticleList.module.scss\''
        },
        {
            filename: 'D:\\Nature Projects\\HabrProduction\\src\\pages\\ArticlesPage\\ui\\ArticlesPage\\file.tsx',
            code: 'import {ArticlesPageFilters} from \'@/pages/ArticlesPage/ui/ArticlesPageFilters/ArticlesPageFilters\';',
            errors: [{messageId: 'RELATIVE_PATH_ERROR'}],
            options: [{
                alias: '@'
            }],
            output: 'import {ArticlesPageFilters} from \'../ArticlesPageFilters/ArticlesPageFilters\';'
        },
    ],
});
