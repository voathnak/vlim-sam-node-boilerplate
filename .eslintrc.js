module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true, // Enables Node.js global variables and Node.js scoping.
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 2020, // Use the latest ecmascript standard
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'max-len': ['error', { code: 100, tabWidth: 2 }],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    camelcase: ['error', { properties: 'never' }],
    'array-bracket-spacing': 0,
    'new-cap': 0,
    'padded-blocks': 0,
    'global-require': 0,
    'no-param-reassign': 0,
    'import/no-dynamic-require': 0,
    'import/no-unresolved': 0,
    'consistent-return': 0,
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': 0,
  },
  ignorePatterns: ['**/__tests__/**/*.test.js'],
  globals: {
    jest: true,
    describe: true,
    beforeAll: true,
    afterAll: true,
    it: true,
    expect: true,
  },
};
