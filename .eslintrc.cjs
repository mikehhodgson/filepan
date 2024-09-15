const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-prettier',
  ],
  eslintPluginPrettierRecommended,
};
