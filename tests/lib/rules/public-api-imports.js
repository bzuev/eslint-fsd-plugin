const {RuleTester} = require('eslint');
const rule = require('../../../lib/rules/public-api-imports');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});

const aliasOptions = {
    alias: '@'
}

ruleTester.run('public-api-imports', rule, {
    valid: [
        {
            code: 'import { types } from \'@/entities/Article\'',
            errors: [],
        },
        {
            code: 'import { types } from \'entities/Article\'',
            errors: [],
        },
        {
            code: 'import { types } from \'../../Article\'',
            errors: [],
        },
        {
            filename: 'D:\\FULL FRONTEND КУРС\\src\\entities\\Article\\file.test.ts',
            code: 'import {someFiles} from \'@/entities/Article/testing\'',
            errors: [],
            options: [{
                alias: '@',
                testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx']
            }]
        },
        {
            filename: 'D:\\FULL FRONTEND КУРС\\src\\entities\\Article\\StoreDecorator.tsx',
            code: 'import {someFiles} from \'@/entities/Article/testing\'',
            errors: [],
            options: [{
                alias: '@',
                testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx']
            }]
        }
    ],

    invalid: [
        {
            code: 'import { types } from \'@/entities/Article/model/types\'',
            errors: [{messageId: 'PUBLIC_ERROR'}],
            options: [aliasOptions],
            output: 'import { types } from \'@/entities/Article\''
        },
        {
            code: 'import { types } from \'entities/Article/model/types\'',
            errors: [{messageId: 'PUBLIC_ERROR'}],
            options: [aliasOptions],
            output: 'import { types } from \'@/entities/Article\''
        },
        {
            filename: 'D:\\FULL FRONTEND КУРС\\src\\entities\\Article\\StoreDecorator.tsx',
            code: 'import {someFiles} from \'@/entities/Article/testing/file.tsx\'',
            errors: [{messageId: 'PUBLIC_ERROR'}],
            options: [{
                alias: '@',
                testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx']
            }],
            output: 'import {someFiles} from \'@/entities/Article\''
        },
        // eslint-disable-next-line eslint-plugin/consistent-output
        {
            filename: 'D:\\FULL FRONTEND КУРС\\src\\entities\\Article\\article.ts',
            code: 'import {someFiles} from \'@/entities/Article/testing\'',
            errors: [{messageId: 'TESTING_PUBLIC_ERROR'}],
            options: [{
                alias: '@',
                testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx']
            }]
        }
    ],
});
