module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'index',
          'sibling',
          'parent',
          'object',
        ],
        pathGroups: [
          {
            pattern: 'src/**',
            group: 'index',
            position: 'before',
          },
          {
            pattern: 'typings/**',
            group: 'index',
            position: 'before',
          },
          {
            pattern: '../public/**',
            group: 'parent',
            position: 'after',
          },
          {
            pattern: '../../public/**',
            group: 'parent',
            position: 'after',
          },
          {
            pattern: '../../../public/**',
            group: 'parent',
            position: 'after',
          },
          {
            pattern: '../../../../public/**',
            group: 'parent',
            position: 'after',
          },
          {
            pattern: '../../../../../public/**',
            group: 'parent',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: [
          'src/**',
          'typings/**',
          '../public/**',
          '../../public/**',
          '../../../public/**',
          '../../../../public/**',
          '../../../../../public/**',
        ],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
  },
}
