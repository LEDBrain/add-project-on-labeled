module.exports = {
    env: {
        node: true,
        es2020: true,
        jest: true,
    },
    plugins: ['prettier', 'jest', '@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'plugin:jest/style',
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
        'guard-for-in': 2,
        'no-prototype-builtins': 0,
        'prettier/prettier': 'error',
        'semi': ['error', 'always'],
    },
};
