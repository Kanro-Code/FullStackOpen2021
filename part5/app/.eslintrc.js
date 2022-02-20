/* eslint-env node */
module.exports = {
	env: {
		browser: true,
		es6: true,
		'jest/globals': true,
	},
	extends: ['airbnb', 'airbnb/hooks'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react', 'jest'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': [
			'error',
			'unix',
		],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		eqeqeq: 'error',
		'no-trailing-spaces': 'error',
		'object-curly-spacing': [
			'error', 'always',
		],
		'arrow-spacing': [
			'error', { before: true, after: true },
		],
		'no-console': 0,
		'no-tabs': 0,

		'react/prop-types': 0,
		'react/react-in-jsx-scope': 'off',
		'react/jsx-filename-extension': 0,
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}
