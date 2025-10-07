# Desc (`fsd-core/public-api-checker`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

The public-api-import rule prohibits absolute imports not from the public api, that is, the index file.
The rule applies only to the following layers: pages, entities, features, widgets. Imports of other layers are not processed

## Rule Details

Examples of **incorrect** code for this rule:

```js
import { types } from '@/entities/Article/model/types/article.ts';

// The import is NOT made from the public api of the Article layer - this is bad
```

Examples of **correct** code for this rule:

```js
import { types } from '@/entities/Article';

// The import is made from the public api of the Article layer - this is good
```

### Options

#### Alias

If you use alias in your imports, then you should pass them as follows:

```js
{
    "rules": {
        "fsd-core/public-api-imports": [
            "error",
            {
                alias: '{YOUR ALIAS}'
            }
        ]
    }
}
```

Example:

```js
{
    "rules": {
        "fsd-core/public-api-imports": [
            "error",
            {
                alias: '@'
            }
        ]
    }
}
```

#### TestFilesPatterns

If your project has any test environments to which you need to import any data that may not be in the public api (index.ts file), then you can transfer patterns of text files.
In this case, files that match at least one transmitted pattern will be ignored by the rule public-api-imports.

You can transfer patterns as follows:

```js
{
    "rules": {
        "fsd-core/public-api-imports": [
            "error",
            {
                testFilesPatterns: [
                    '**/*.test.*',
                    ...
                ]
            }
        ]
    }
}
```
