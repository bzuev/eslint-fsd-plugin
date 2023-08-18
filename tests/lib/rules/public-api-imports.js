
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
  ],
});
