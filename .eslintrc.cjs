/* eslint-env node */
module.exports = {
  'root': true,
  'env': {
    'commonjs': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
  ],
  'overrides': [
    {
      'files': [ '**/*.ts', '**/*.tsx' ],
      'env': { 'node': true },
      'parser': '@typescript-eslint/parser',
      'plugins': [
        '@typescript-eslint',
      ],
      'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      'rules': {
        'indent': 'off',
        '@typescript-eslint/indent': [ 'error', 2 ],
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/member-delimiter-style': 'error',
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
      },
    },
  ],
  'rules': {
    'no-case-declarations': 'off',
    'import/no-unresolved': 'off',
    'import/namespace': 'off',
    'import/no-duplicates': 'off',
    'no-async-promise-executor': 'off',
    'block-spacing': 'error',
    'import/named': 'off',
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'never' ],
    'curly': 2,
    'indent': [ 'error', 2 ],
    'no-throw-literal': 'off',
    'array-bracket-spacing': [
      'error',
      'always',
      {
        'singleValue': true,
        'objectsInArrays': true,
        'arraysInArrays': true,
      },
    ],
    'camelcase': [
      'error',
      {
        'properties': 'always',
      },
    ],
    'arrow-spacing': [ 'error', { 'before': true, 'after': true } ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'comma-spacing': [ 'error', { 'after': true } ],
    'space-in-parens': [ 'error', 'always' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'func-call-spacing': [ 'error', 'never' ],
    'computed-property-spacing': [ 'error', 'always' ],
    'key-spacing': [ 'error', { afterColon: true, mode: 'strict' } ],
    'template-curly-spacing': [ 'error', 'always' ],
    'keyword-spacing': [ 'error', { before: true, after: true } ],
    'operator-assignment': [ 'error', 'always' ],
    'no-var': 'error',
    'func-style': 'error',
    'no-console': [
      'error',
    ],
    'eol-last': [ 'error', 'always' ],
  },
}
