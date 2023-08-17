# eslint-plugin-babun4ek-fsd-plugin

This is an eslint-plugin to check for absolute paths within a single module.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-babun4ek-fsd-plugin`:

```sh
npm install eslint-plugin-babun4ek-fsd-plugin --save-dev
```

## Usage

Add `eslint-plugin-babun4ek-fsd-plugin` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "babun4ek-fsd-plugin"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "babun4ek-fsd-plugin/path-checker": "error"
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                       | Description                                 |
| :----------------------------------------- | :------------------------------------------ |
| [path-checker](/docs/rules/path-checker.md) | feature-sliced design relative path checker |

<!-- end auto-generated rules list -->



