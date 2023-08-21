
module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:eslint-plugin/recommended',
        'plugin:node/recommended',
        'airbnb',
        'prettier'
    ],
    env: {
        node: true,
        browser: true,
        es2021: true
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        'eslint-plugin/prefer-message-ids': 'off',
        indent: [2, 4],
        'node/no-unpublished-require': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-use-before-define': 'off',
        'max-len': [2, 150],
        quotes: [2, 'single'],
    },
    overrides: [
        {
            files: ['tests/**/*.js'],
            env: { mocha: true },
        }
    ],
};
