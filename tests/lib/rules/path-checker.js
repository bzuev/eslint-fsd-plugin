/**
 * @fileoverview feature-sliced design relative path checker
 * @author Ivan
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-checker"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});

ruleTester.run("path-checker", rule, {
  valid: [
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\entities\\Article",
      code: "import { RatingCard } from '../../model/slice/index.ts';",
      errors: [],
    },
  ],

  invalid: [
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\entities\\Article",
      code: "import { RatingCard } from '@/entities/Article';",
      errors: [{ message: "В рамках одного слайса все пути должны быть относительными"}],
      options: [{
        alias: '@'
      }]
    },
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\entities\\Article",
      code: "import { RatingCard } from 'entities/Article';",
      errors: [{ message: "В рамках одного слайса все пути должны быть относительными"}],
    }
  ],
});
