# Desc (`fsd-core/layer-imports-checker`)

<!-- end auto-generated rule header -->

The layer-imports-checker rule checks imports from other layers and returns an error if files are imported from the overlying layers.

Allowed layers to import from each layer:

#### app layer:

[
'pages',
'widgets',
'features',
'entities',
'shared'
]

#### pages layer:

[
'widgets',
'features',
'entities',
'shared'
]

#### widgets layer:

[
'features',
'entities',
'shared'
]

#### features layer:

[
'entities',
'shared'
]

#### entities layer:

[
'entities',
'shared'
]

#### shared layer:

[
'shared'
]

## Rule Details

Examples of **incorrect** code for this rule:

```js
// if currentFilePath is **src\\entities\\Article\\file.tsx

import { someFiles } from '@/features/editableProfileCard';

// You cannot import files from the entities layer from the features layer
```

```js
// if currentFilePath is **src\\features\\Article\\file.tsx

import { someFiles } from '@/app/providers/StoreProvider';

// You cannot import files from the features layer from the app layer
```

Examples of **correct** code for this rule:

```js
// if currentFilePath is **src\\entities\\Article\\file.tsx

import { someFiles } from '@/shared/ui/Button';

// You can import files from the entities layer from the shared layer
```

```js
// if currentFilePath is **src\\features\\EditableProfileCard\\file.tsx

import { someFiles } from '@/entities/User/file.tsx';

// You can import files from the features layer from the entities layer
```

### Options

If you need to ignore certain import patterns, then you can specify them as follows:

```js
{
    "rules": {
        "fsd-core/layer-imports-checker": [
            "error",
            {
                ignoreImportsPatters: [
                    '**/*.test.*',
                    ...
                ],
                alias: '@'
            }
        ]
    }
}
```
