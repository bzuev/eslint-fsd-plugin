# Description (`babun4ek-fsd-plugin/public-api-imports`)

The public-api-import rule prohibits absolute imports not from the public api, that is, the index file.
The rule applies only to the following layers: pages, entities, features, widgets. Imports of other layers are not processed

## Rule Details

Examples of **incorrect** code for this rule:

```js
    import { types } from '@/entities/Article'; 
    
    // The import is made from the public api of the Article layer - this is good 
```

Examples of **correct** code for this rule:

```js
    import { types } from '@/entities/Article/model/types/article.ts'

    // The import is NOT made from the public api of the Article layer - this is bad
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
