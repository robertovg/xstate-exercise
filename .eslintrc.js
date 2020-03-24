module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'airbnb/hooks', 'prettier/react', 'eslint-config-prettier'],
  globals: {},
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  plugins: ['react', 'eslint-plugin-prettier'],
  rules: {
    'prettier/prettier': 'error',
    semi: ['error', 'never'],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/jsx-boolean-value': 'off',
    'max-len': [
      'error',
      {
        tabWidth: 2,
        code: 100,
        ignoreUrls: true,
        ignoreTrailingComments: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-unused-vars': [
      1,
      {
        argsIgnorePattern: '^_',
      },
    ],
    'react/prop-types': ['warn', { ignore: ['children'] }],
    'eslint(one-var)': 'off',
    'react/jsx-props-no-spreadin': 'off',
    'no-param-reassign': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
