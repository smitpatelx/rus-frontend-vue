/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    // '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'prettier/prettier': [
      'error',
      // {
      //   tabWidth: 2,
      //   singleQuote: true,
      //   printWidth: 100,
      //   trailingComma: 'all',
      //   semi: true,
      //   arrowParens: 'always',
      //   jsxBracketSameLine: true,
      //   bracketSpacing: true,
      //   bracketSameLine: false,
      //   singleAttributePerLine: true,
      //   embeddedLanguageFormatting: 'off',
      // },
    ],
  },
};
