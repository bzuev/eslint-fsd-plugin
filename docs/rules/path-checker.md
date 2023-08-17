# Feature-sliced design relative path checker (`babun4ek-fsd-plugin/path-checker`)

The path-checker rule checks for absolute paths in your project using the FSD methodology. If you use absolute import from the same module within the same module, you will get an error (or a warning, depending on what value for path-checker you use).

## Rule Details

Examples of **incorrect** code for this rule:

```js
    import { ArticleListItem } from '@/entities/Article/ui/ArticleListItem/ArticleListItem';

    // Provided that the import is done inside the Article module
```

Examples of **correct** code for this rule:

```js
    import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

    // Provided that the import is done inside the Article module
```

### Options

If you use alias in your imports, then you should pass them as follows:

```js
{
    "rules": {
        "babun4ek-fsd-plugin/path-checker": ["error", {alias: '{YOUR ALIAS}'}]
    }
}
```

Example:

```js
{
    "rules": {
        "babun4ek-fsd-plugin/path-checker": ["error", {alias: '@'}]
    }
}
```
