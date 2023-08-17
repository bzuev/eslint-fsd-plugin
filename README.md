# eslint-plugin-feature-sliced-design-plugin

eslint-plugin to check for absolute paths within a single module

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-feature-sliced-design-plugin`:

```sh
npm install eslint-plugin-feature-sliced-design-plugin --save-dev
```

## Usage

Add `feature-sliced-design-plugin` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "feature-sliced-design-plugin"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "feature-sliced-design-plugin/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->



