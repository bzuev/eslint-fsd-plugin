# 🎯 Eslint plugin based on FSD

An ESLint plugin designed to enforce path conventions based on the Feature-Sliced Design (FSD) methodology.

## 📦 Installation

First, ensure you have [ESLint](https://eslint.org/) installed:

```sh
npm i eslint --save-dev
```

Then, install the `eslint-plugin-fsd-core` package:

```sh
npm install eslint-plugin-fsd-core --save-dev
```

## ⚙️ Configuration

Add `fsd-core` to the `plugins` section of your `.eslintrc` file:

```json
{
	"plugins": ["fsd-core"]
}
```

Then, enable the desired rules in the `rules` section:

```json
{
	"rules": {
		"fsd-core/path-checker": "error"
	}
}
```

## 📖 Documentation of available Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                         | Description                                 | 🔧  |
| :----------------------------------------------------------- | :------------------------------------------ | :-- |
| [layer-imports-checker](docs/rules/layer-imports-checker.md) | desc                                        |     |
| [path-checker](docs/rules/path-checker.md)                   | feature-sliced design relative path checker | 🔧  |
| [public-api-checker](docs/rules/public-api-checker.md)       | desc                                        | 🔧  |

<!-- end auto-generated rules list -->

| Rule Name                                                    | Description                                    |
| ------------------------------------------------------------ | ---------------------------------------------- |
| [layer-imports-checker](docs/rules/layer-imports-checker.md) | Ensures correct layer imports in FSD structure |
| [path-checker](docs/rules/path-checker.md)                   | Validates relative paths within FSD components |
| [public-api-imports](docs/rules/public-api-checker.md)       | Restricts direct imports outside public API    |
