
const rule = require("../../../lib/rules/layer-imports-checker"),
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

ruleTester.run("layer-imports-checker", rule, {
  valid: [
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\entities\\Article\\file.tsx",
      code: "import {someFiles} from '@/shared/ui/Button'",
      errors: [],
      options: [aliasOptions]
    },
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\entities\\Article\\file.tsx",
      code: "import {someFiles} from '@/entities/User/file.tsx'",
      errors: [],
      options: [aliasOptions]
    },
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\features\\EditableProfileCard\\file.tsx",
      code: "import {someFiles} from '@/entities/User/file.tsx'",
      errors: [],
      options: [aliasOptions]
    },
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\features\\EditableProfileCard\\file.tsx",
      code: "import {someFiles} from '@/shared/ui/Button'",
      errors: [],
      options: [aliasOptions]
    },
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\app\\providers\\file.tsx",
      code: "import {someFiles} from '@/features/EditableProfileCard'",
      errors: [],
      options: [aliasOptions]
    },
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\widgets\\Page\\file.tsx",
      code: "import {useLocation} from 'react-router-dom'",
      errors: [],
      options: [aliasOptions]
    },
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\index.tsx",
      code: "import {someFiles} from '@/app/providers/file.tsx'",
      errors: [],
      options: [aliasOptions]
    },
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\entities\\User\\file.tsx",
      code: "import {StateSchema} from '@/app/providers/StoreProvider'",
      errors: [],
      options: [
        {
          alias: '@',
          ignoreImportsPatters: ['**/StoreProvider']
        }
      ]
    }
  ],

  invalid: [
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\entities\\Article\\file.tsx",
      code: "import {someFiles} from '@/features/editableProfileCard'",
      errors: [{message: 'Данный слой может импортировать в себя только нижележащие слои: entities, shared'}],
      options: [aliasOptions]
    },
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\features\\Article\\file.tsx",
      code: "import {someFiles} from '@/app/providers/StoreProvider'",
      errors: [{message: 'Данный слой может импортировать в себя только нижележащие слои: entities, shared'}],
      options: [aliasOptions]
    },
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\widgets\\Page\\file.tsx",
      code: "import {someFiles} from '@/pages/AboutPage'",
      errors: [{message: 'Данный слой может импортировать в себя только нижележащие слои: features, entities, shared'}],
      options: [aliasOptions]
    },
    {
      filename: "D:\\FULL FRONTEND КУРС\\src\\pages\\AboutPage\\file.tsx",
      code: "import {someFiles} from '@/app/providers/StoreProvider'",
      errors: [{message: 'Данный слой может импортировать в себя только нижележащие слои: widgets, features, entities, shared'}],
      options: [aliasOptions]
    },
  ],
});
