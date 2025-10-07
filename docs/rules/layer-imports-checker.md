# FSD layers imports checker (`fsd-core/layer-imports-checker`)

<!-- end auto-generated rule header -->

The layer-imports-checker rule checks imports from other layers and returns an error if files are imported from the overlying layers.

## Layer import hierarchy

Each layer can import **only** from the layers below it in the hierarchy.  
This ensures a clear, maintainable dependency structure and prevents circular imports.

| Layer           | Allowed imports                                          |
| --------------- | -------------------------------------------------------- |
| 🧩 **app**      | `['pages', 'widgets', 'features', 'entities', 'shared']` |
| 📄 **pages**    | `['widgets', 'features', 'entities', 'shared']`          |
| 🧱 **widgets**  | `['features', 'entities', 'shared']`                     |
| ⚙️ **features** | `['entities', 'shared']`                                 |
| 🧬 **entities** | `['entities', 'shared']`                                 |
| 🎨 **shared**   | `['shared']`                                             |

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

#### Alias

If you use alias in your imports, then you should pass them as follows:

```js
// rules section
"fsd-core/layer-imports-checker": [
    "error",
    {
        alias: '{YOUR ALIAS} e.g "@"'
    }
]
```

#### IgnoreImportsPatters

If you need to ignore certain import patterns, then you can specify them as follows:

```js
// rules section
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
```
