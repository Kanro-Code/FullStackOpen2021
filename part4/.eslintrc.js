module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		jest: true,
	},
	extends: ['airbnb', 'airbnb/hooks'],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'windows'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'no-console': 0,
		'no-tabs': 0,
		'no-param-reassign': 0,
		'no-underscore-dangle': 0,
	},
}
