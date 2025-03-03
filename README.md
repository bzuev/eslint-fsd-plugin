# 🎯 Eslint plugin based on FSD

An ESLint plugin designed to enforce path conventions based on the Feature-Sliced Design (FSD) methodology.

## 📦 Installation

First, ensure you have [ESLint](https://eslint.org/) installed:

```sh
npm i eslint --save-dev
```

Then, install the `eslint-plugin-babun4ek-fsd-plugin` package:

```sh
npm install eslint-plugin-babun4ek-fsd-plugin --save-dev
```

## ⚙️ Configuration

Add `babun4ek-fsd-plugin` to the `plugins` section of your `.eslintrc` file:

```json
{
    "plugins": [
        "babun4ek-fsd-plugin"
    ]
}
```

Then, enable the desired rules in the `rules` section:

```json
{
    "rules": {
        "babun4ek-fsd-plugin/path-checker": "error"
    }
}
```

## 📖 Documentation of available Rules

| Rule Name                                                  | Description                                      |
|-----------------------------------------------------------|--------------------------------------------------|
| [layer-imports-checker](docs/rules/layer-imports-checker.md) | Ensures correct layer imports in FSD structure  |
| [path-checker](docs/rules/path-checker.md)                   | Validates relative paths within FSD components |
| [public-api-imports](docs/rules/public-api-imports.md)       | Restricts direct imports outside public API     |