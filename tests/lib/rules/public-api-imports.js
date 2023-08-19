
const rule = require("../../../lib/rules/public-api-imports"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});

const aliasOptions = {
  alias: '@'
}

ruleTester.run("public-api-imports", rule, {
  valid: [
    {
      code: "import { types } from '@/entities/Article'",
      errors: [],
    },
    {
      code: "import { types } from 'entities/Article'",
      errors: [],
    },
    {
      code: "import { types } from '../../Article'",
      errors: [],
    },
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\entities\\Article\\file.test.ts",
      code: "import {someFiles} from '@/entities/Article/testing'",
      errors: [],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx']
      }]
    },
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\entities\\Article\\StoreDecorator.tsx",
      code: "import {someFiles} from '@/entities/Article/testing'",
      errors: [],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx']
      }]
    }
  ],

  invalid: [
    {
      code: "import { types } from '@/entities/Article/model/types'",
      errors: [{ message: 'Абсолютный импорт разрешен только из Public API (index.ts)' }],
      options: [aliasOptions]
    },
    {
      code: "import { types } from 'entities/Article/model/types'",
      errors: [{ message: 'Абсолютный импорт разрешен только из Public API (index.ts)' }],
    },
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\entities\\Article\\StoreDecorator.tsx",
      code: "import {someFiles} from '@/entities/Article/testing/file.tsx'",
      errors: [{ message: 'Абсолютный импорт разрешен только из Public API (index.ts)' }],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx']
      }]
    },
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\entities\\Article\\article.ts",
      code: "import {someFiles} from '@/entities/Article/testing'",
      errors: [{ message: 'Тестовые данные необходимо импортировать только из PublicApi (testing.ts)' }],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx']
      }]
    }
  ],
});
