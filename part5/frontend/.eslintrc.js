module.exports = {
	env: {
		browser: true,
		es6: true,
		'jest/globals': true,
		node: true,
		amd: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'airbnb',
		'airbnb/hooks',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: [
		'react', 'jest',
	],
	rules: {
		indent: ['error', 'tab'],
		'react/jsx-indent': ['error', 'tab'],
		'linebreak-style': [
			'error',
			'windows',
		],
		quotes: [
			'error',
			'single',
		],
		semi: [
			'error',
			'never',
		],
		eqeqeq: 'error',
		'no-trailing-spaces': 'error',
		'object-curly-spacing': [
			'error', 'always',
		],
		'arrow-spacing': [
			'error', { before: true, after: true },
		],
		'no-console': 0,
		'react/prop-types': 0,
		'no-tabs': 0,
		'react/jsx-filename-extension': 0,
		'react/jsx-indent-props': 0,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}
